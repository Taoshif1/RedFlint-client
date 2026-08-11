import { Link } from "react-router";
import { Wrench } from "lucide-react";

const Maintenance = () => {
  return (
    <main className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
          <Wrench className="w-9 h-9 text-primary" />
        </div>

        <p className="text-primary uppercase tracking-[0.25em] text-sm font-semibold">
          RedFlint Maintenance
        </p>

        <h1 className="text-4xl md:text-6xl font-black red-hat mt-3">
          We’ll be back shortly.
        </h1>

        <p className="text-base-content/60 leading-7 mt-5">
          The RedFlint store is temporarily unavailable while we perform
          maintenance. Existing data and orders remain safe.
        </p>

        <div className="mt-8">
          <Link to="/login" className="btn btn-outline btn-primary">
            Admin Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Maintenance;
