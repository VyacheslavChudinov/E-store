import {
  PayloadAction,
  asyncThunkCreator,
  buildCreateSlice,
  createEntityAdapter,
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

interface ProductFilters {
  brands: string[];
  types: string[];
}

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

function initParams() {
  return { orderBy: "name", pageNumber: 1, pageSize: 9, brands: [], types: [] };
}

export const catalogSlice = createSliceWithThunk({
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
  reducers: (create) => ({
    setProductParams: create.reducer(
      (state, action: PayloadAction<Partial<ProductParams>>) => {
        state.productsLoaded = false;
        state.productParams = { ...state.productParams, ...action.payload };
      }
    ),
    setPaginationDetails: create.reducer(
      (state, action: PayloadAction<PaginationDetails>) => {
        state.paginationDetails = {
          ...state.paginationDetails,
          ...action.payload,
        };
      }
    ),
    resetProductParams: create.reducer((state) => {
      state.productParams = initParams();
    }),

    fetchFilters: create.asyncThunk<void, ProductFilters>(
      async (_, thunkAPI) => {
        try {
          return await agent.Catalog.getProductFilters();

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return thunkAPI.rejectWithValue({ error: error.data });
        }
      },
      {
        pending: (state) => {
          state.status = "pendingFetchFilters";
        },
        fulfilled: (state, action) => {
          state.brands = action.payload.brands;
          state.types = action.payload.types;
          state.filtersLoaded = true;
          state.status = "idle";
        },
        rejected: (state, action) => {
          console.log(action);
          state.status = "idle";
        },
      }
    ),

    fetchProductsAsync: create.asyncThunk<void, Product[]>(
      async (_, thunkAPI) => {
        try {
          const state = thunkAPI.getState() as RootState;
          const params = getAxiosParams(state.catalog.productParams);
          const { items, paginationDetails } = await agent.Catalog.getProducts(
            params
          );

          thunkAPI.dispatch(setPaginationDetails(paginationDetails));

          return items;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.data);
        }
      },
      {
        pending: (state) => {
          state.status = "pendingFetchProducts";
        },

        fulfilled: (state, action) => {
          productsAdapter.setAll(state, action.payload);
          state.status = "idle";
          state.productsLoaded = true;
        },

        rejected: (state, action) => {
          console.log(action);
          state.status = "idle";
        },
      }
    ),

    fetchProductAsync: create.asyncThunk(
      async (productId: number, thunkAPI) => {
        try {
          return await agent.Catalog.getProduct(productId);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.data);
        }
      },
      {
        pending: (state) => {
          state.status = "pendingFetchProduct";
        },
        fulfilled: (state, action) => {
          productsAdapter.upsertOne(state, action.payload);
          state.status = "idle";
        },
        rejected: (state, action) => {
          console.log(action);
          state.status = "idle";
        },
      }
    ),
  }),
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const {
  fetchFilters,
  fetchProductsAsync,
  fetchProductAsync,
  setProductParams,
  resetProductParams,
  setPaginationDetails,
} = catalogSlice.actions;
