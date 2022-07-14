import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center w-screen h-screen p-16 bg-white text-gray-600">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h1 className="mb-8 font-extrabold text-9xl ">404</h1>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn bg-blue-500 text-white border-blue-500 hover:bg-blue-500 hover:border-blue-500 focus:border-blue-500  w-full"
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
