import { AxiosResponse } from "axios";
import create from "zustand";
import axios from "../api/axios";

interface User {
  id: number;
  email: string;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  persist: boolean;
  signInUser: (email: string, password: string) => any;
  signUpUser: (email: string, password: string) => any;
  signOutUser: () => void;
}

export const userStore = create<UserState>((set) => ({
  user: null,
  accessToken: null,
  persist: localStorage.getItem("persist")
    ? JSON.parse(localStorage.getItem("persist")!)
    : false,
  signInUser: async (email: string, password: string) => {
    try {
      const response: AxiosResponse = await axios.post(
        "/signin",
        { email, password },
        {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        }
      );
      set({
        user: response.data.userData,
        accessToken: response.data.accessToken,
      });

      return { message: "Successfully signed in" };
    } catch (e: any) {
      return e.response.data;
    }
  },
  signUpUser: async (email: string, password: string) => {
    try {
      await axios.post(
        "/signup",
        { email, password },
        { headers: { "content-type": "application/json" } }
      );
      return { message: "Successfully signed up" };
    } catch (e: any) {
      return e.response.data;
    }
  },
  signOutUser: async () => {
    try {
      const response = await axios("/signout", { withCredentials: true });
      set({ user: null, accessToken: null });
      return response.data;
    } catch (e: any) {
      return e.response.data;
    }
  },
}));
