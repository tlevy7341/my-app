import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState("");
  const FormSchema = z
    .object({
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .trim(),
      passwordconfirm: z.string().min(8, "Please confirm your password").trim(),
    })
    .refine((data) => data.password === data.passwordconfirm, {
      message: "Passwords do not match",
      path: ["passwordconfirm"],
    });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const submitData = async (data: FormSchemaType) => {
    const response = await fetch("/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: authToken, password: data.password }),
    });
    const result = await response.json();
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(result.message);
    setTimeout(() => navigate("/signin"), 2000);
    reset();
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (!token) {
      navigate("/signin");
    }
    setAuthToken(token as string);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center ">
      <div className="px-4 sm:max-w-xl sm:mx-auto py-10 bg-white shadow-lg rounded sm:p-20">
        <div>
          <h1 className="text-2xl text-center text-black font-semibold">
            Reset Password
          </h1>
        </div>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="pt-8 text-base  space-y-4 text-gray-700 sm:text-lg ">
            <div className="relative">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="New Password"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                New Password
              </label>
              {errors.password && (
                <p className="text-sm mt-0 text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                {...register("passwordconfirm")}
                id="passwordconfirm"
                name="passwordconfirm"
                type="password"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="Confirm Password"
              />
              <label
                htmlFor="passwordconfirm"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Confirm Password
              </label>
              {errors.passwordconfirm && (
                <p className="text-sm mt-0 text-red-500">
                  {errors.passwordconfirm.message}
                </p>
              )}
            </div>
            <button className="btn bg-blue-500 text-white border-blue-500 hover:bg-blue-500 hover:border-blue-500 focus:border-blue-500  w-full">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
