import { FaFacebookMessenger } from "react-icons/fa";

const MessengerSupport = () => {
  const messengerLink = "https://m.me/redflintbd";

  return (
    <a
      href={messengerLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact RedFlint on Messenger"
      title="Chat with us on Messenger"
      className="btn btn-circle fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-3 z-[90] min-h-12 min-w-12 border-0 bg-blue-600 text-white shadow-2xl hover:bg-blue-700 sm:right-5 sm:min-h-14 sm:min-w-14"
    >
      <FaFacebookMessenger size={28} />
    </a>
  );
};

export default MessengerSupport;
