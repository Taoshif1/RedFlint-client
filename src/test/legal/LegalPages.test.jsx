import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import PrivacyPolicy from "../../pages/PrivacyPolicy";
import TermsConditions from "../../pages/TermsConditions";

test("renders the RedFlint privacy policy and contact route", () => {
  render(
    <MemoryRouter>
      <PrivacyPolicy />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("heading", { name: "Privacy Policy" }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: "Contact Us" })[0]).toHaveAttribute(
    "href",
    "/contact",
  );
  expect(screen.getByText(/HTTP-only session cookie/i)).toBeInTheDocument();
});

test("renders the terms with payment and return information", () => {
  render(
    <MemoryRouter>
      <TermsConditions />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("heading", { name: "Terms & Conditions" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Return Policy" })).toHaveAttribute(
    "href",
    "/return",
  );
  expect(screen.getAllByText(/Cash on Delivery/i)).toHaveLength(2);
});
