import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import agent, { LoginPayload } from "../../app/api/agent";

export interface AccountState {
  user: User;
  status: string;
}

const initialState: AccountState = {
  user: {
    email: "",
    token: "",
  },
  status: "idle",
};

export const login = createAsyncThunk<User, LoginPayload>(
  "account/login",
  async (loginPayload, thunkAPI) => {
    try {
      const user = await agent.Account.login(loginPayload);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const user = await agent.Account.currentUser();
      localStorage.setItem("user", JSON.stringify(user));

      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const accountSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(login.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      isAnyOf(login.rejected, fetchCurrentUser.rejected),
      (_, action) => {
        console.log(action.payload);
      }
    );
  },
});

export const { setUser } = accountSlice.actions;
