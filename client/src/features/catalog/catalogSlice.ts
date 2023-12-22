import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { PaginationDetails } from "../../app/models/pagination";

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy.toString());

  if (productParams.brands?.length) {
    params.append("brands", productParams.brands.toString());
  }

  if (productParams.types?.length) {
    params.append("types", productParams.types.toString());
  }

  if (productParams.searchTerm?.length) {
    params.append("searchTerm", productParams.searchTerm.toString());
  }

  return params;
}

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  brands: string[];
  types: string[];
  status: string;
  productParams: ProductParams;
  paginationDetails: PaginationDetails | null;
}

export const fetchFilters = createAsyncThunk<{
  brands: string[];
  types: string[];
}>("products/getProductFilters", async (_, thunkAPI) => {
  try {
    return await agent.Catalog.getProductFilters();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("products/getProductsAsync", async (_, thunkAPI) => {
  try {
    const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
    const { items, paginationDetails } = await agent.Catalog.getProducts(
      params
    );

    thunkAPI.dispatch(setPaginationDetails(paginationDetails));

    return items;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.data);
  }
});

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "products/getProductAsync",
  async (productId: number, thunkAPI) => {
    try {
      return await agent.Catalog.getProduct(productId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

function initParams() {
  return { orderBy: "name", pageNumber: 1, pageSize: 9, brands: [], types: [] };
}

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    brands: [] as string[],
    types: [] as string[],
    status: "idle",
    productParams: initParams(),
    paginationDetails: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    setPaginationDetails: (state, action) => {
      state.paginationDetails = {
        ...state.paginationDetails,
        ...action.payload,
      };
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
  },
  extraReducers: (builder) => {
    // fetch products cases
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });

    // fetch single product cases
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });

    // fetch product filters cases
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filtersLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const { setProductParams, resetProductParams, setPaginationDetails } =
  catalogSlice.actions;
