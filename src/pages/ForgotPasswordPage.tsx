import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const ForgotPasswordPage = () => {
  const FormSchema = z.object({
    email: z
      .string({ required_error: "This field is required" })
      .email()
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
    const response = await fetch("/forgot-password", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(result.message);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="px-4 sm:max-w-xl sm:mx-auto flex flex-col gap-y-7 py-5 bg-white shadow-lg rounded sm:p-10">
        <div>
          <h1 className="text-2xl text-center text-black font-semibold">
            Forgot your password?
          </h1>
        </div>
        <div>
          <p className="text-gray-500 text-sm">
            Don't fret! Just type in your email and we will send you an email to
            reset your password!
          </p>
        </div>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="relative">
            <input
              {...register("email")}
              id="email"
              name="email"
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              placeholder="Email address"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Email Address
            </label>
            {errors.email && (
              <p className="text-sm mt-0 text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className="btn bg-blue-500 mt-4 text-white border-blue-500 hover:bg-blue-500 hover:border-blue-500 focus:border-blue-500  w-full">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
