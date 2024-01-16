import {
  asyncThunkCreator,
  buildCreateSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { Order } from "../../app/models/order";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

export interface OrdersState {
  status: string;
}

const ordersAdapter = createEntityAdapter<Order>();

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const ordersSlice = createSliceWithThunk({
  name: "orders",
  initialState: ordersAdapter.getInitialState<OrdersState>({
    status: "idle",
  }),
  reducers: (create) => ({
    setOrders: create.reducer((state, action: { payload: Order[] }) => {
      ordersAdapter.setAll(state, action.payload);
    }),

    fetchOrders: create.asyncThunk<void, Order[]>(
      async (_, thunkAPI) => {
        try {
          return await agent.Orders.getOrders();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          thunkAPI.rejectWithValue({ error: error.data });
        }
      },
      {
        pending: (state) => {
          state.status = "pendingOrders";
        },

        fulfilled: (state, action) => {
          ordersAdapter.setAll(state, action.payload);
          state.status = "idle";
        },

        rejected: (state) => {
          state.status = "idle";
        },

        options: { condition: () => !!localStorage.getItem("user") },
      }
    ),

    fetchOrder: create.asyncThunk<number, Order>(
      async (id, thunkAPI) => {
        try {
          return await agent.Orders.getOrder(id);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          thunkAPI.rejectWithValue({ error: error.data });
        }
      },
      {
        pending: (state) => {
          state.status = "pendingOrder";
        },

        fulfilled: (state, action) => {
          ordersAdapter.upsertOne(state, action.payload);
          state.status = "idle";
        },

        rejected: (state) => {
          state.status = "idle";
        },

        options: { condition: () => !!localStorage.getItem("user") },
      }
    ),
  }),
});

export const ordersSelectors = ordersAdapter.getSelectors(
  (state: RootState) => state.orders
);

export const { fetchOrders, fetchOrder, setOrders } = ordersSlice.actions;
