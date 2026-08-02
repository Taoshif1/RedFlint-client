import { FaUserShield } from "react-icons/fa";

const WelcomeCard = () => {
  return (
    <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-8 mb-8">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-400 text-2xl ">
            Welcome Back, <span className="text-red-500 text-3xl">Admin</span>
          </p>
          <p className="text-gray-400 mt-3">
            Here's what's happening in your store today.
          </p>
        </div>

        <div className="hidden md:flex w-20 h-20 rounded-full bg-red-600 items-center justify-center">
          <FaUserShield className="text-4xl text-white" />
        </div>

      </div>
    </div>
  );
};

export default WelcomeCard;