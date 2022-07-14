import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { userStore } from "../zustand/userStore";

const SignUpPage = () => {
  const { signUpUser } = userStore();
  const navigate = useNavigate();
  const FormSchema = z.object({
    email: z
      .string({ required_error: "This field is required" })
      .email()
      .trim(),
    password: z
      .string({ required_error: "This field is required" })
      .min(1, "Please enter a password")
      .trim(),
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

  const submitData = async (formData: FormSchemaType) => {
    const response = await signUpUser(formData.email, formData.password);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success("Successfully signed up");
    navigate("/signin");
    reset();
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-100 ">
      <div className="px-4 pt-10 bg-white rounded shadow-lg sm:max-w-xl sm:mx-auto sm:p-20 sm:pb-0">
        <div>
          <h1 className="text-2xl font-semibold text-center text-black">
            Sign Up
          </h1>
        </div>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="pt-8 space-y-4 text-base text-gray-700 sm:text-lg ">
            <div className="relative">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="text"
                className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                placeholder="Email address"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Email Address
              </label>
              {errors.email && (
                <p className="mt-0 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Password
              </label>
              {errors.password && (
                <p className="m-0 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <button className="w-full mt-2 text-white bg-blue-500 border-blue-500 btn hover:bg-blue-500 hover:border-blue-500 focus:border-blue-500">
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <div className="flex justify-center pt-20 pb-2">
          <p className="text-sm text-gray-500">
            Already have an account?
            <Link
              to="/signin"
              className="pl-1 text-sm text-blue-500 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
