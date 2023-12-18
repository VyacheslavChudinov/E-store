import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchFilters = createAsyncThunk<{
  brands: string[];
  types: string[];
}>("products/getProductFilters", async (_, thunkAPI) => {
  try {
    return await agent.Catalog.getProductFilters();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "products/getProductsAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.getProducts();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.data);
    }
  }
);

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

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    filtersLoaded: false,
    brands: [] as string[],
    types: [] as string[],
    status: "idle",
  }),
  reducers: {},
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
