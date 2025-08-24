import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <h1 className="text-5xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Unauthorized Access
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, you don’t have permission to view this page.
        </p>

        <Link
          to="/"
          className="inline-block bg-orange-400 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
