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
  sendForgotPasswordEmail: (email: string) => any;
  resetPassword: (authToken: string, password: string) => any;
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
    } catch (e: any) {
      return { error: e.response.data };
    }
  },
  signUpUser: async (email: string, password: string) => {
    try {
      await axios.post(
        "/signup",
        { email, password },
        { headers: { "content-type": "application/json" } }
      );
    } catch (e: any) {
      return { error: e.response.data };
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
  sendForgotPasswordEmail: async (email: string) => {
    try {
      await axios.post("/forgot-password", { email });
    } catch (e: any) {
      return e.response.data;
    }
  },
  resetPassword: async (authToken: string, password: string) => {
    try {
      await axios.patch("/reset-password", { password, authToken });
    } catch (e: any) {
      return { error: e.response.data };
    }
  },
}));
