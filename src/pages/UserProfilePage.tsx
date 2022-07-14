import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserType = {
  id: number;
  email: string;
  password: string;
  createdAt: string;
};

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType>();

  let avatar = createAvatar(style, { dataUri: true, size: 128 });

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/signin");
    } else {
      setCurrentUser(JSON.parse(sessionStorage.getItem("user") as string));
    }
  }, []);

  return (
    <>
      <div className="w-screen h-screen bg-white text-gray-800 flex gap-y-4 justify-center items-center">
        <div className="h-full  flex flex-col justify-around">
          <div className="rounded-3xl border-4 flex justify-center items-center p-3 border-black">
            <img src={avatar} alt="picture of the user avatar" />
          </div>

          <p className="flex items-center">
            <span className="text-2xl pr-2 font-bold ">Hello</span>
            <span>{currentUser?.email}</span>
          </p>
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
        <div className="modal-box p-10">
          <h3 className="font-bold text-red-400 text-center text-lg">
            Are you sure you want to delete your account?
          </h3>
          <div className="flex justify-around items-stretch">
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
