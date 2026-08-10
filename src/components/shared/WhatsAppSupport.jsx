import { FaWhatsapp } from "react-icons/fa";

import useSettings from "../../hooks/useSettings";

import { buildWhatsAppUrl } from "../../utils/whatsapp";

const WhatsAppSupport = () => {
  const { settings, loading } = useSettings();

  if (loading) {
    return null;
  }

  const whatsappNumber = settings?.whatsappNumber || settings?.supportPhone;

  if (!whatsappNumber) {
    return null;
  }

  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    "Hi RedFlint, I need help with an order or product.",
  );

  if (!whatsappUrl) {
    return null;
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact RedFlint on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-[9990] btn btn-success btn-circle shadow-2xl"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppSupport;
