import {
  PayloadAction,
  asyncThunkCreator,
  buildCreateSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import {
  CreateProductPayload,
  Product,
  ProductParams,
  UpdateProductPayload,
} from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";
import { PaginationDetails } from "../../app/models/pagination";
import { AxiosResponse } from "axios";
import agent from "../../app/api/agent";

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
  return { orderBy: "name", pageNumber: 1, pageSize: 6, brands: [], types: [] };
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
    setProduct: create.reducer((state, action: PayloadAction<Product>) => {
      state = productsAdapter.upsertOne(state, action.payload);
    }),

    deleteProduct: create.reducer((state, action: PayloadAction<number>) => {
      state = productsAdapter.removeOne(state, action.payload);
    }),

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

    fetchProductAsync: create.asyncThunk<number, Product>(
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
    updateProductAsync: create.asyncThunk<UpdateProductPayload, Product>(
      async (payload: UpdateProductPayload, thunkAPI) => {
        try {
          return await agent.Admin.updateProduct(payload);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.data);
        }
      },
      {
        pending: (state) => {
          state.status = "pendingUpdateProduct";
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

    createProductAsync: create.asyncThunk<CreateProductPayload, Product>(
      async (payload: CreateProductPayload, thunkAPI) => {
        try {
          return await agent.Admin.createProduct(payload);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.data);
        }
      },
      {
        pending: (state) => {
          state.status = "pendingCreateProduct";
        },
        fulfilled: (state) => {
          state.productsLoaded = false;
          state.filtersLoaded = false;
          state.status = "idle";
        },
        rejected: (state, action) => {
          console.log(action);
          state.status = "idle";
        },
      }
    ),
    deleteProductAsync: create.asyncThunk<number, AxiosResponse>(
      async (id: number, thunkAPI) => {
        try {
          return await agent.Admin.deleteProduct(id);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.data);
        }
      },
      {
        pending: (state) => {
          state.status = "pendingDeleteProduct";
        },
        fulfilled: (state) => {
          state.productsLoaded = false;
          state.filtersLoaded = false;
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
  updateProductAsync,
  createProductAsync,
  deleteProductAsync,
  deleteProduct,
  setProduct,
  setProductParams,
  resetProductParams,
  setPaginationDetails,
} = catalogSlice.actions;
