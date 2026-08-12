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
      className="btn btn-success btn-circle fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-[90] min-h-12 min-w-12 shadow-2xl sm:right-5 sm:min-h-14 sm:min-w-14"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppSupport;
