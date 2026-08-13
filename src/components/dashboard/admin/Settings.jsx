import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useSettings from "../../../hooks/useSettings";
import {
  buildStoreSettingsPayload,
  toEditableStoreSettings,
} from "../../../utils/storeSettings";

const Settings = () => {
  const axiosSecure = useAxiosSecure();
  const { settings, loading, refetch } = useSettings();
  const [formData, setFormData] = useState(() => toEditableStoreSettings());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!settings) return;

    setFormData(toEditableStoreSettings(settings));
  }, [settings]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentChange = (method, field, value) => {
    setFormData((current) => ({
      ...current,
      paymentMethods: {
        ...current.paymentMethods,
        [method]: {
          ...current.paymentMethods[method],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await axiosSecure.patch(
        "/settings",
        buildStoreSettingsPayload(formData),
      );

      toast.success("Settings updated successfully.");
      await refetch();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update settings.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl">
      <div className="card border border-base-300 bg-base-200 shadow-xl">
        <div className="card-body p-4 sm:p-8">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Store Settings</h2>
            <p className="mt-2 text-sm text-base-content/60">
              These values control the live checkout and customer support links.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-10">
            <fieldset>
              <legend className="mb-5 text-xl font-semibold">
                Store Information
              </legend>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="form-control">
                  <span className="label-text mb-2">Store name</span>
                  <input
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    maxLength={100}
                    required
                  />
                </label>

                <label className="form-control">
                  <span className="label-text mb-2">Support email</span>
                  <input
                    type="email"
                    name="supportEmail"
                    value={formData.supportEmail}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    maxLength={254}
                    required
                  />
                </label>

                <label className="form-control">
                  <span className="label-text mb-2">Support phone</span>
                  <input
                    type="tel"
                    name="supportPhone"
                    value={formData.supportPhone}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    maxLength={30}
                  />
                </label>

                <label className="form-control">
                  <span className="label-text mb-2">WhatsApp number</span>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    maxLength={30}
                  />
                </label>

                <label className="form-control md:col-span-2">
                  <span className="label-text mb-2">Messenger link</span>
                  <input
                    type="url"
                    name="messengerLink"
                    value={formData.messengerLink}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="https://m.me/redflintbd"
                    maxLength={300}
                  />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-xl font-semibold">
                Payment Methods
              </legend>
              <p className="mb-5 text-sm text-base-content/60">
                Disabled methods disappear from checkout immediately after saving.
              </p>

              <div className="space-y-5">
                {Object.entries(formData.paymentMethods).map(
                  ([key, method]) => (
                    <div
                      key={key}
                      className="rounded-2xl border border-base-300 bg-base-100 p-4 sm:p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-bold">{method.label}</h3>
                          <p className="text-xs text-base-content/60">
                            {method.requiresTransactionId
                              ? "Transaction ID required"
                              : "No transaction ID required"}
                          </p>
                        </div>

                        <label className="label cursor-pointer gap-3">
                          <span className="label-text">Enabled</span>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            aria-label={`${method.label} enabled`}
                            checked={method.enabled}
                            onChange={(event) =>
                              handlePaymentChange(
                                key,
                                "enabled",
                                event.target.checked,
                              )
                            }
                          />
                        </label>
                      </div>

                      {key !== "cod" && (
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <label className="form-control">
                            <span className="label-text mb-2">
                              Account number
                            </span>
                            <input
                              type="tel"
                              className="input input-bordered w-full"
                              aria-label={`${method.label} account number`}
                              value={method.accountNumber}
                              maxLength={30}
                              required={method.enabled}
                              onChange={(event) =>
                                handlePaymentChange(
                                  key,
                                  "accountNumber",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label className="form-control">
                            <span className="label-text mb-2">Account type</span>
                            <input
                              className="input input-bordered w-full"
                              aria-label={`${method.label} account type`}
                              value={method.accountType}
                              maxLength={30}
                              placeholder="Personal or Merchant"
                              onChange={(event) =>
                                handlePaymentChange(
                                  key,
                                  "accountType",
                                  event.target.value,
                                )
                              }
                            />
                          </label>
                        </div>
                      )}

                      <label className="form-control mt-4">
                        <span className="label-text mb-2">
                          Checkout instructions
                        </span>
                        <textarea
                          className="textarea textarea-bordered w-full"
                          aria-label={`${method.label} checkout instructions`}
                          value={method.instructions}
                          maxLength={240}
                          rows={2}
                          required
                          onChange={(event) =>
                            handlePaymentChange(
                              key,
                              "instructions",
                              event.target.value,
                            )
                          }
                        />
                      </label>
                    </div>
                  ),
                )}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-5 text-xl font-semibold">Shipping</legend>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="form-control">
                  <span className="label-text mb-2">Shipping fee (BDT)</span>
                  <input
                    type="number"
                    name="shippingFee"
                    value={formData.shippingFee}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    min="0"
                    max="1000000"
                    required
                  />
                </label>

                <label className="form-control">
                  <span className="label-text mb-2">
                    Free shipping from (BDT)
                  </span>
                  <input
                    type="number"
                    name="freeShipping"
                    value={formData.freeShipping}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    min="0"
                    max="1000000"
                    required
                  />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-5 text-xl font-semibold">System</legend>

              <div className="alert alert-warning items-start">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={formData.maintenanceMode}
                  onChange={handleChange}
                  className="toggle toggle-primary mt-1"
                  aria-label="Maintenance mode"
                />
                <div>
                  <h3 className="font-bold">Maintenance Mode</h3>
                  <p className="text-sm">
                    Blocks new orders while store maintenance is in progress.
                  </p>
                </div>
              </div>
            </fieldset>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary min-w-40"
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Settings;
