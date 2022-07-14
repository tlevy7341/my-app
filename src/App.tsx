import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { userStore } from "./zustand/userStore";

function App() {
  const navigate = useNavigate();
  const { user } = userStore();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState<any>([{}]);

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get("/users");
      setUsers(response.data.users);
    } catch (e: any) {
      toast.error(`${e.response.statusText}. Please sign in`);
      navigate("/signin", { state: { location }, replace: true });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-y-5">
      <p>Hello There</p>

      {users &&
        users.map((user: any) => {
          return <p>{user.email}</p>;
        })}
    </div>
  );
}

export default App;
