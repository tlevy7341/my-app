import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAvatar from "../utils/getAvatar";
import { userStore } from "../zustand/userStore";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const { user, changeAvatar, deleteAccount, accessToken } = userStore();
  const [avatar, setAvatar] = useState(user?.avatar);
  const effectRan = useRef(false);

  const handleOnChangeAvatar = (id: number) => {
    const newAvatar = getAvatar();
    changeAvatar(newAvatar, id);
    setAvatar(newAvatar);
  };

  const handleDeleteAccount = async (id: number) => {
    const response = await deleteAccount(id, accessToken!);
    if (response?.error) {
      toast.error(response.error);
      return;
    }
    toast.success("Account deleted successfully");
    navigate("/signin", { replace: true });
  };

  useEffect(() => {
    if (effectRan.current === false) {
      const localStorageDarkMode = localStorage.getItem("darkMode");

      if (localStorageDarkMode) {
        setDarkMode(JSON.parse(localStorageDarkMode));
      }
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode, avatar]);

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen text-gray-800 bg-white gap-y-4">
        <div className="flex flex-col justify-around h-full">
          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-center p-3 border-2 border-black rounded-3xl">
              <img src={avatar} alt="picture of the user avatar" />
            </div>
            <button
              onClick={() => handleOnChangeAvatar(user!.id)}
              className="mt-2 btn btn-xs"
            >
              Change Avatar
            </button>
          </div>
          <div>
            <p className="flex items-center">
              <span className="pr-2 text-2xl font-bold ">Hello</span>
              <span>{user?.email}</span>
            </p>
            <div className="pt-4 form-control">
              <label className="label">
                <span className="text-gray-800 label-text">Dark Mode</span>
                <input
                  onChange={() => setDarkMode(!darkMode)}
                  type="checkbox"
                  className="toggle"
                  checked={darkMode}
                />
              </label>
            </div>
          </div>
          <label
            htmlFor="confirm-delete-account"
            className="btn btn-outline btn-error"
          >
            Delete Account
          </label>
        </div>
      </div>

      <input
        type="checkbox"
        id="confirm-delete-account"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="p-10 modal-box">
          <h3 className="text-lg font-bold text-center text-red-400">
            Are you sure you want to delete your account?
          </h3>
          <div className="flex items-stretch justify-around">
            <div className="modal-action">
              <label
                htmlFor="confirm-delete-account"
                className="btn btn-outline btn-error"
              >
                Cancel
              </label>
            </div>
            <div className="modal-action">
              <label
                onClick={() => handleDeleteAccount(user!.id)}
                htmlFor="confirm-delete-account"
                className="btn btn-outline btn-success"
              >
                Confirm
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
