import { useNavigate } from "react-router-dom";
import { Button } from "./UI/button";

type ErrorProps = {
  errorMessage?: string;
};

function Error({ errorMessage }: ErrorProps) {
  const navigate = useNavigate();
  return (
    <div className="flex pt-[5rem] justify-center min-h-screen bg-indigo-50 p-6">
      <div className="rounded-lg p-4 sm:p-8 w-full sm:w-[50vw] max-w-full  md:max-w-[400px] mx-auto text-center">
        <div className="flex justify-center">
          <svg
            className="w-16 h-16 text-[#ff4d4d] animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 5.636l-12.728 12.728m12.728 0L5.636 5.636m0 12.728L18.364 5.636"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#280b5f] mt-4 font-mono">
          Oops!
        </h2>
        <p className="text-[#3a0e7b] mt-2 font-mono text-l">
          Something went wrong.
        </p>
        {!!errorMessage && (
          <p className="text-[#3a0e7b] mt-2">{errorMessage}</p>
        )}
        <div className="flex justify-between">
          <Button
            className="mt-6 bg-[#70e2d2] min-w-[110px] text-[#280b5f] px-4 py-2 rounded-lg shadow hover:bg-[#02e3c5]transition duration-300"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
          <Button
            className="mt-6 bg-[#70e2d2] min-w-[110px] text-[#280b5f] px-4 py-2 rounded-lg shadow hover:bg-[#02e3c5] transition duration-300"
            onClick={() => navigate("/")}
          >
            Back Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Error;
