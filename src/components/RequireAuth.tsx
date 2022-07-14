import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userStore } from "../zustand/userStore";

const RequireAuth = () => {
  const location = useLocation();
  const { user } = userStore();
  console.log("🚀 ~ RequireAuth ~ user", user);

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to={{ pathname: "/signin" }}
      state={{ from: location }}
      replace={true}
    />
  );
};

export default RequireAuth;
