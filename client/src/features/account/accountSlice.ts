import {
  PayloadAction,
  asyncThunkCreator,
  buildCreateSlice,
} from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import agent, { LoginPayload } from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";
export interface AccountState {
  user: User | null;
  status: string;
}

const initialState: AccountState = {
  user: null,
  status: "idle",
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const accountSlice = createSliceWithThunk({
  name: "User",
  initialState,
  reducers: (create) => ({
    setUser: create.reducer((state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }),
    logout: create.reducer((state) => {
      state.user = null;
      localStorage.removeItem("user");
      router.navigate("/");
    }),

    login: create.asyncThunk<LoginPayload, User>(
      async (loginPayload: LoginPayload, thunkAPI) => {
        try {
          const { basket, ...user } = await agent.Account.login(loginPayload);
          if (basket) {
            thunkAPI.dispatch(setBasket(basket));
          }
          localStorage.setItem("user", JSON.stringify(user));

          return user;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return thunkAPI.rejectWithValue({ error: error.data });
        }
      },
      {
        fulfilled: (state, action) => {
          state.user = action.payload;
          state.status = "idle";
          router.navigate("/");
        },
        rejected: (_, action) => {
          throw action.payload;
        },
      }
    ),

    fetchCurrentUser: create.asyncThunk<void, User>(
      async (_, thunkAPI) => {
        const userStorage = JSON.parse(localStorage.getItem("user")!);
        thunkAPI.dispatch(setUser(userStorage));

        try {
          const { basket, ...user } = await agent.Account.currentUser();
          if (basket) {
            thunkAPI.dispatch(setBasket(basket));
          }
          localStorage.setItem("user", JSON.stringify(user));

          return user;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return thunkAPI.rejectWithValue({ error: error.data });
        }
      },
      {
        fulfilled: (state, action) => {
          state.user = action.payload;
          state.status = "idle";
        },
        rejected: (state) => {
          state.user = null;
          localStorage.removeItem("user");
          toast.error("Session expired - please login again");
          router.navigate("/");
        },

        options: { condition: () => !!localStorage.getItem("user") },
      }
    ),
  }),
});

export const { fetchCurrentUser, login, logout, setUser } =
  accountSlice.actions;
