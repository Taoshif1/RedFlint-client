export const DEFAULT_PAYMENT_METHODS = {
  bkash: {
    enabled: false,
    label: "bKash",
    accountNumber: "",
    accountType: "Personal",
    instructions:
      "Send the full order amount, then enter the bKash transaction ID.",
    requiresTransactionId: true,
  },
  nagad: {
    enabled: false,
    label: "Nagad",
    accountNumber: "",
    accountType: "Personal",
    instructions:
      "Send the full order amount, then enter the Nagad transaction ID.",
    requiresTransactionId: true,
  },
  cod: {
    enabled: true,
    label: "Cash on Delivery",
    accountNumber: "",
    accountType: "",
    instructions: "Pay in cash when your order is delivered.",
    requiresTransactionId: false,
  },
};

export const getEnabledPaymentMethods = (settings = {}) =>
  Object.fromEntries(
    Object.entries(DEFAULT_PAYMENT_METHODS)
      .map(([key, defaults]) => [
        key,
        {
          ...defaults,
          ...(settings.paymentMethods?.[key] || {}),
          label: defaults.label,
          requiresTransactionId: defaults.requiresTransactionId,
        },
      ])
      .filter(([, method]) => method.enabled),
  );
