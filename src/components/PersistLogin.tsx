import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import useRefreshToken from "../hooks/useRefreshToken";
import { userStore } from "../zustand/userStore";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { accessToken } = userStore();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (e) {
        console.log(e);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-screen h-screen bg-transparent">
          <BarLoader />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
