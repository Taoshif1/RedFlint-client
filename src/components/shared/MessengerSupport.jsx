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
      className="fixed right-5 bottom-20 z-[9990] btn btn-circle bg-blue-600 text-white border-0 hover:bg-blue-700 shadow-2xl"
    >
      <FaFacebookMessenger size={28} />
    </a>
  );
};

export default MessengerSupport;