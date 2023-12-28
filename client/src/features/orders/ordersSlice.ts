import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Order } from "../../app/models/order";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

export interface OrdersState {
  status: string;
}

const ordersAdapter = createEntityAdapter<Order>();

export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { state: RootState }
>(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      return await agent.Orders.getOrders();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => !!localStorage.getItem("user"),
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState: ordersAdapter.getInitialState<OrdersState>({
    status: "idle",
  }),
  reducers: {
    setOrders: (state, action) => {
      ordersAdapter.setAll(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.status = "pendingOrders";
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      ordersAdapter.setAll(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const ordersSelectors = ordersAdapter.getSelectors(
  (state: RootState) => state.orders
);

export const { setOrders } = ordersSlice.actions;
