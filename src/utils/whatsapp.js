export const normalizeWhatsAppNumber = (number = "") => {
  let digits = String(number).replace(/\D/g, "");

  if (!digits) return "";

  // Already Bangladesh international format
  if (digits.startsWith("880")) {
    return digits;
  }

  // 017XXXXXXXX -> 88017XXXXXXXX
  if (digits.startsWith("0")) {
    return `880${digits.slice(1)}`;
  }

  // 17XXXXXXXX -> 88017XXXXXXXX
  if (digits.startsWith("1") && digits.length === 10) {
    return `880${digits}`;
  }

  return digits;
};

export const buildWhatsAppUrl = (number, message = "") => {
  const cleanNumber = normalizeWhatsAppNumber(number);

  if (!cleanNumber) {
    return "";
  }

  const baseUrl = `https://wa.me/${cleanNumber}`;

  if (!message) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
};
