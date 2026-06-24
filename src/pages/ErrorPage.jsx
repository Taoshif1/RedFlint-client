import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-8xl font-black text-primary">404</h1>

      <h2 className="text-3xl font-bold">Page Not Found</h2>

      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
