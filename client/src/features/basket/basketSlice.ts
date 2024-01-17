import {
  PayloadAction,
  asyncThunkCreator,
  buildCreateSlice,
} from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import { getCookie } from "../../app/utils/cookie";

export interface BasketState {
  basket: Basket | null;
  status: string;
  updatingProducts: number[];
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
  updatingProducts: [],
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const basketSlice = createSliceWithThunk({
  name: "basket",
  initialState,
  reducers: (create) => ({
    setBasket: create.reducer((state, action: PayloadAction<Basket>) => {
      state.basket = action.payload;
    }),

    clearBasket: create.reducer((state) => {
      state.basket = null;
    }),

    fetchCurrentBasket: create.asyncThunk<void, Basket>(
      async (_, thunkAPI) => {
        try {
          return await agent.Basket.get();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          thunkAPI.rejectWithValue({ error: error.data });
        }
      },
      {
        pending: (state) => {
          state.status = "pendingBasket";
        },
        fulfilled: (state, action) => {
          state.basket = action.payload;

          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "idle";
        },
        options: { condition: () => !!getCookie("buyerId") },
      }
    ),

    addBasketItemAsync: create.asyncThunk<
      {
        productId: number;
        quantity?: number;
      },
      Basket
    >(
      async ({ productId, quantity = 1 }, thunkAPI) => {
        try {
          return await agent.Basket.addItem(productId, quantity);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.data);
        }
      },
      {
        pending: (state, action) => {
          console.log(action);
          state.updatingProducts.push(action.meta.arg.productId);
        },

        rejected: (state, action) => {
          console.log(action);
          state.updatingProducts = state.updatingProducts.filter(
            (updatingProductId) =>
              updatingProductId !== action.meta.arg.productId
          );
        },

        fulfilled: (state, action) => {
          state.basket = action.payload;
          state.updatingProducts = state.updatingProducts.filter(
            (updatingProductId) =>
              updatingProductId !== action.meta.arg.productId
          );
        },
      }
    ),

    removeBasketItemAsync: create.asyncThunk<{
      productId: number;
      quantity?: number;
    }>(
      async ({ productId, quantity = 1 }, thunkAPI) => {
        try {
          await agent.Basket.remove(productId, quantity);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.data);
        }
      },
      {
        pending: (state, action) => {
          console.log(action);
          state.updatingProducts.push(action.meta.arg.productId);
        },

        fulfilled: (state, action) => {
          const { productId, quantity = 1 } = action.meta.arg;

          if (!state.basket) {
            return;
          }

          const itemIndex = state.basket.items.findIndex(
            (item) => item.productId === productId
          );

          if (itemIndex === -1) {
            return;
          }

          state.basket.items[itemIndex].quantity -= quantity;
          if (state.basket.items[itemIndex].quantity <= 0) {
            state.basket.items.splice(itemIndex, 1);
          }

          state.updatingProducts = state.updatingProducts.filter(
            (updatingProductId) =>
              updatingProductId !== action.meta.arg.productId
          );
        },

        rejected: (state, action) => {
          console.log(action);
          state.updatingProducts = state.updatingProducts.filter(
            (updatingProductId) =>
              updatingProductId !== action.meta.arg.productId
          );
        },
      }
    ),
  }),
});

export const {
  setBasket,
  clearBasket,
  fetchCurrentBasket,
  addBasketItemAsync,
  removeBasketItemAsync,
} = basketSlice.actions;
