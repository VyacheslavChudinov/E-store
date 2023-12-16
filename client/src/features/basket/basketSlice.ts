import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";

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

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity?: number }
>("basket/addBasketItemAsync", async ({ productId, quantity = 1 }) => {
  try {
    return await agent.Basket.addItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity?: number }
>("basket/removeBasketItemAsync", async ({ productId, quantity = 1 }) => {
  try {
    await agent.Basket.remove(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.updatingProducts.push(action.meta.arg.productId);
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.updatingProducts = state.updatingProducts.filter(
        (updatingProductId) => updatingProductId !== action.meta.arg.productId
      );
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      state.updatingProducts.filter(
        (updatingProductId) => updatingProductId !== action.meta.arg.productId
      );
    });

    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.updatingProducts.push(action.meta.arg.productId);
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;

      if (!state.basket) {
        return;
      }

      const itemIndex = state.basket.items.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex === -1) {
        return;
      }

      state.basket.items[itemIndex].quantity -= quantity!;
      if (state.basket.items[itemIndex].quantity <= 0) {
        state.basket.items.splice(itemIndex, 1);
      }

      state.updatingProducts = state.updatingProducts.filter(
        (updatingProductId) => updatingProductId !== action.meta.arg.productId
      );
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      state.updatingProducts.filter(
        (updatingProductId) => updatingProductId !== action.meta.arg.productId
      );
    });
  },
});

export const { setBasket } = basketSlice.actions;
export default basketSlice.reducer;
