import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const fetchCurrentBasket = createAsyncThunk(
  "basket/fetchCurrentBasket",
  async (_, thunkAPI) => {
    try {
      return await agent.Basket.get();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => !!getCookie("buyerId"),
  }
);

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity?: number }
>(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number }
>("basket/removeBasketItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    await agent.Basket.remove(productId, quantity);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.data);
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    clearBasket: (state) => {
      state.basket = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentBasket.pending, (state) => {
      state.status = "pendingBasket";
    });
    builder.addCase(fetchCurrentBasket.fulfilled, (state, action) => {
      state.basket = action.payload;

      state.status = "idle";
    });
    builder.addCase(fetchCurrentBasket.rejected, (state) => {
      state.status = "idle";
    });

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
      console.log(action);
      state.updatingProducts = state.updatingProducts.filter(
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

      state.basket.items[itemIndex].quantity -= quantity;
      if (state.basket.items[itemIndex].quantity <= 0) {
        state.basket.items.splice(itemIndex, 1);
      }

      state.updatingProducts = state.updatingProducts.filter(
        (updatingProductId) => updatingProductId !== action.meta.arg.productId
      );
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.log(action);
      state.updatingProducts = state.updatingProducts.filter(
        (updatingProductId) => updatingProductId !== action.meta.arg.productId
      );
    });
  },
});

export const { setBasket, clearBasket } = basketSlice.actions;
