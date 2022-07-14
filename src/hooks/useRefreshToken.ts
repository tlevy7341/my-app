import axios from "../api/axios";
import { userStore } from "../zustand/userStore";

const useRefreshToken = () => {
  const { accessToken } = userStore();

  const refresh = async () => {
    const response = await axios.get("/refresh-token", {
      withCredentials: true,
    });

    if (response.data.newAccessToken) {
      userStore.setState({ accessToken: response.data.newAccessToken });
      userStore.setState({ user: response.data.userData });
    }
    return response.data.newAccessToken;
  };

  return refresh;
};

export default useRefreshToken;
