import { AxiosResponse } from "axios";
import create from "zustand";
import axios from "../api/axios";
import getAvatar from "../utils/getAvatar";

interface User {
  id: number;
  email: string;
  avatar: string;
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
  changeAvatar: (avatar: string, id: number) => any;
  deleteAccount: (id: number, token: string) => any;
}

export const userStore = create<UserState>((set) => ({
  user: null,
  accessToken: null,
  persist: localStorage.getItem("persist")
    ? JSON.parse(localStorage.getItem("persist")!)
    : false,
  darkMode: localStorage.getItem("darkMode")
    ? JSON.parse(localStorage.getItem("darkMode")!)
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

      if (!response.data.userData.avatar) {
        const avatar = getAvatar();
        response.data.userData.avatar = avatar;
        await axios.patch("/update-avatar", {
          avatar,
          id: response.data.userData.id,
        });
      }

      set({
        user: response.data.userData,
        accessToken: response.data.accessToken,
      });
    } catch (e: any) {
      return e.response.data
        ? { error: e.response.data }
        : { error: "Something went wrong" };
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

  changeAvatar: async (avatar: string, id: number) => {
    try {
      await axios.patch("/update-avatar", { avatar, id });
    } catch (e: any) {
      return { error: e.response.data };
    }
  },
  deleteAccount: async (id: number, token: string) => {
    try {
      await axios.delete("/delete-account", {
        data: { id },
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e: any) {
      return { error: e.response.data };
    }
  },
}));
