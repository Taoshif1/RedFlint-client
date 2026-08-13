import { DEFAULT_PAYMENT_METHODS } from "./paymentMethods";

const PAYMENT_METHOD_KEYS = Object.keys(DEFAULT_PAYMENT_METHODS);

const textOrDefault = (value, fallback = "") =>
  typeof value === "string" ? value : fallback;

export const toEditableStoreSettings = (settings = {}) => ({
  storeName: textOrDefault(settings.storeName),
  supportEmail: textOrDefault(settings.supportEmail),
  supportPhone: textOrDefault(settings.supportPhone),
  whatsappNumber: textOrDefault(settings.whatsappNumber),
  messengerLink: textOrDefault(settings.messengerLink),
  currency: "BDT",
  shippingFee: settings.shippingFee ?? 120,
  freeShipping: settings.freeShipping ?? 3000,
  maintenanceMode: settings.maintenanceMode === true,
  paymentMethods: Object.fromEntries(
    PAYMENT_METHOD_KEYS.map((key) => {
      const defaults = DEFAULT_PAYMENT_METHODS[key];
      const method = settings.paymentMethods?.[key] || {};

      return [
        key,
        {
          enabled:
            typeof method.enabled === "boolean"
              ? method.enabled
              : defaults.enabled,
          label: defaults.label,
          accountNumber: textOrDefault(
            method.accountNumber,
            defaults.accountNumber,
          ),
          accountType: textOrDefault(
            method.accountType,
            defaults.accountType,
          ),
          instructions: textOrDefault(
            method.instructions,
            defaults.instructions,
          ),
          requiresTransactionId: defaults.requiresTransactionId,
        },
      ];
    }),
  ),
});

export const buildStoreSettingsPayload = (formData) => ({
  storeName: formData.storeName,
  supportEmail: formData.supportEmail,
  supportPhone: formData.supportPhone,
  whatsappNumber: formData.whatsappNumber,
  messengerLink: formData.messengerLink,
  currency: "BDT",
  shippingFee: Number(formData.shippingFee),
  freeShipping: Number(formData.freeShipping),
  maintenanceMode: formData.maintenanceMode === true,
  paymentMethods: Object.fromEntries(
    PAYMENT_METHOD_KEYS.map((key) => {
      const method = formData.paymentMethods[key];

      return [
        key,
        {
          enabled: method.enabled === true,
          accountNumber: method.accountNumber,
          accountType: method.accountType,
          instructions: method.instructions,
        },
      ];
    }),
  ),
});
