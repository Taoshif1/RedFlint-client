import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Settings from "../../components/dashboard/admin/Settings";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useSettings from "../../hooks/useSettings";
import {
  buildStoreSettingsPayload,
  toEditableStoreSettings,
} from "../../utils/storeSettings";
import toast from "react-hot-toast";

vi.mock("../../hooks/useAxiosSecure", () => ({
  default: vi.fn(),
}));

vi.mock("../../hooks/useSettings", () => ({
  default: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const makeSettings = (paymentOverrides = {}) => ({
  _id: "store",
  createdAt: "2026-08-13T10:00:00.000Z",
  updatedAt: "2026-08-13T11:00:00.000Z",
  storeName: "RedFlint",
  supportEmail: "support@redflint.com",
  supportPhone: "01700000000",
  whatsappNumber: "01700000000",
  messengerLink: "https://m.me/redflintbd",
  currency: "BDT",
  shippingFee: 120,
  freeShipping: 3000,
  maintenanceMode: true,
  paymentMethods: {
    bkash: {
      enabled: false,
      label: "bKash",
      accountNumber: "",
      accountType: "Merchant",
      instructions: "Send payment with bKash.",
      requiresTransactionId: true,
      ...paymentOverrides.bkash,
    },
    nagad: {
      enabled: false,
      label: "Nagad",
      accountNumber: "",
      accountType: "Merchant",
      instructions: "Send payment with Nagad.",
      requiresTransactionId: true,
      ...paymentOverrides.nagad,
    },
    cod: {
      enabled: true,
      label: "Cash on Delivery",
      accountNumber: "",
      accountType: "",
      instructions: "Pay in cash on delivery.",
      requiresTransactionId: false,
      ...paymentOverrides.cod,
    },
  },
});

let mockAxios;
let mockRefetch;
let settingsResponse;
let consoleErrorSpy;

beforeEach(() => {
  vi.clearAllMocks();

  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  settingsResponse = makeSettings();
  mockRefetch = vi.fn().mockResolvedValue({});
  mockAxios = {
    patch: vi.fn().mockResolvedValue({ data: { success: true } }),
  };

  useAxiosSecure.mockReturnValue(mockAxios);
  useSettings.mockImplementation(() => ({
    settings: settingsResponse,
    loading: false,
    refetch: mockRefetch,
  }));
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
});

test("loads all editable store and payment settings", () => {
  settingsResponse = makeSettings({
    bkash: {
      enabled: true,
      accountNumber: "TEST-BKASH-ACCOUNT",
    },
    nagad: {
      enabled: true,
      accountNumber: "TEST-NAGAD-ACCOUNT",
    },
  });

  render(<Settings />);

  expect(screen.getByLabelText("Store name")).toHaveValue("RedFlint");
  expect(screen.getByLabelText("Shipping fee (BDT)")).toHaveValue(120);
  expect(screen.getByLabelText("Free shipping from (BDT)")).toHaveValue(3000);
  expect(screen.getByLabelText("Maintenance mode")).toBeChecked();
  expect(screen.getByLabelText("bKash enabled")).toBeChecked();
  expect(screen.getByLabelText("bKash account number")).toHaveValue(
    "TEST-BKASH-ACCOUNT",
  );
  expect(screen.getByLabelText("Nagad enabled")).toBeChecked();
  expect(screen.getByLabelText("Nagad account number")).toHaveValue(
    "TEST-NAGAD-ACCOUNT",
  );
  expect(screen.getByLabelText("Cash on Delivery enabled")).toBeChecked();
});

test("enables and saves bKash with a clean whitelisted payload", async () => {
  const user = userEvent.setup();
  render(<Settings />);

  await user.click(screen.getByLabelText("bKash enabled"));
  await user.type(
    screen.getByLabelText("bKash account number"),
    "TEST-BKASH-ACCOUNT",
  );
  await user.click(screen.getByRole("button", { name: "Save Changes" }));

  await waitFor(() => {
    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
  });

  const payload = mockAxios.patch.mock.calls[0][1];
  expect(mockAxios.patch).toHaveBeenCalledWith("/settings", payload);
  expect(payload).not.toHaveProperty("_id");
  expect(payload).not.toHaveProperty("createdAt");
  expect(payload).not.toHaveProperty("updatedAt");
  expect(payload.paymentMethods.bkash).toEqual({
    enabled: true,
    accountNumber: "TEST-BKASH-ACCOUNT",
    accountType: "Merchant",
    instructions: "Send payment with bKash.",
  });
  expect(payload.paymentMethods.nagad.enabled).toBe(false);
  expect(payload.paymentMethods.cod.enabled).toBe(true);
  expect(payload.shippingFee).toBe(120);
  expect(payload.freeShipping).toBe(3000);
  expect(payload.maintenanceMode).toBe(true);
  expect(mockRefetch).toHaveBeenCalledTimes(1);
  expect(toast.success).toHaveBeenCalledWith(
    "Settings updated successfully.",
  );
});

test("enables and saves Nagad without resetting bKash, COD, or shipping", async () => {
  settingsResponse = makeSettings({
    bkash: {
      enabled: true,
      accountNumber: "TEST-BKASH-ACCOUNT",
    },
  });
  const user = userEvent.setup();
  render(<Settings />);

  await user.click(screen.getByLabelText("Nagad enabled"));
  await user.type(
    screen.getByLabelText("Nagad account number"),
    "TEST-NAGAD-ACCOUNT",
  );
  await user.click(screen.getByRole("button", { name: "Save Changes" }));

  await waitFor(() => {
    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
  });

  const payload = mockAxios.patch.mock.calls[0][1];
  expect(payload.paymentMethods.bkash).toEqual(
    expect.objectContaining({
      enabled: true,
      accountNumber: "TEST-BKASH-ACCOUNT",
    }),
  );
  expect(payload.paymentMethods.nagad).toEqual(
    expect.objectContaining({
      enabled: true,
      accountNumber: "TEST-NAGAD-ACCOUNT",
    }),
  );
  expect(payload.paymentMethods.cod.enabled).toBe(true);
  expect(payload).toEqual(
    expect.objectContaining({
      shippingFee: 120,
      freeShipping: 3000,
      maintenanceMode: true,
    }),
  );
});

test("reloads persisted bKash, Nagad, and COD state from the server response", () => {
  settingsResponse = makeSettings({
    bkash: { enabled: true, accountNumber: "TEST-BKASH-ACCOUNT" },
    nagad: { enabled: true, accountNumber: "TEST-NAGAD-ACCOUNT" },
    cod: { enabled: true },
  });

  const { unmount } = render(<Settings />);
  unmount();
  render(<Settings />);

  expect(screen.getByLabelText("bKash enabled")).toBeChecked();
  expect(screen.getByLabelText("bKash account number")).toHaveValue(
    "TEST-BKASH-ACCOUNT",
  );
  expect(screen.getByLabelText("Nagad enabled")).toBeChecked();
  expect(screen.getByLabelText("Nagad account number")).toHaveValue(
    "TEST-NAGAD-ACCOUNT",
  );
  expect(screen.getByLabelText("Cash on Delivery enabled")).toBeChecked();
});

test("reports a backend validation error without claiming the save succeeded", async () => {
  mockAxios.patch.mockRejectedValueOnce({
    response: { data: { message: "Unsupported settings field." } },
  });
  const user = userEvent.setup();
  render(<Settings />);

  await user.click(screen.getByRole("button", { name: "Save Changes" }));

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith("Unsupported settings field.");
  });
  expect(toast.success).not.toHaveBeenCalled();
  expect(mockRefetch).not.toHaveBeenCalled();
});

test("payload builder strips unknown top-level and payment-method fields", () => {
  const editable = toEditableStoreSettings({
    ...makeSettings(),
    arbitraryServerField: "must-not-submit",
    paymentMethods: {
      ...makeSettings().paymentMethods,
      bkash: {
        ...makeSettings().paymentMethods.bkash,
        privateNote: "must-not-submit",
      },
    },
  });
  const payload = buildStoreSettingsPayload(editable);

  expect(Object.keys(payload).sort()).toEqual(
    [
      "currency",
      "freeShipping",
      "maintenanceMode",
      "messengerLink",
      "paymentMethods",
      "shippingFee",
      "storeName",
      "supportEmail",
      "supportPhone",
      "whatsappNumber",
    ].sort(),
  );
  expect(Object.keys(payload.paymentMethods.bkash).sort()).toEqual(
    ["accountNumber", "accountType", "enabled", "instructions"].sort(),
  );
});
