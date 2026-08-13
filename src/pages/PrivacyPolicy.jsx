import { Link } from "react-router";

import LegalPage from "../components/shared/LegalPage";

const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy" effectiveDate="13 August 2026">
    <p>
      This Privacy Policy explains how RedFlint collects, uses, stores, and
      shares personal information when you browse our website, create an
      account, contact us, or place and track an order.
    </p>

    <h2>1. Information we collect</h2>
    <p>Depending on how you use RedFlint, we may collect:</p>
    <ul>
      <li>
        account information, such as your name, email address, profile photo,
        and authentication identifier;
      </li>
      <li>
        order and delivery information, including your phone number, address,
        city, postal code, selected products, size, quantity, and order history;
      </li>
      <li>
        payment-confirmation information, such as the selected payment method
        and transaction ID for supported mobile-wallet payments;
      </li>
      <li>
        customer-support messages and information you submit through our
        contact or social-support channels; and
      </li>
      <li>
        essential technical information required to maintain a secure login
        session and operate the website.
      </li>
    </ul>
    <p>
      RedFlint does not collect or store your mobile-wallet PIN. Never send a
      PIN, password, one-time code, or other secret credential to us.
    </p>

    <h2>2. How we use information</h2>
    <p>We use personal information to:</p>
    <ul>
      <li>create and secure customer accounts;</li>
      <li>process, confirm, deliver, and track orders;</li>
      <li>verify payment references and prevent duplicate transactions;</li>
      <li>manage returns, cancellations, support requests, and disputes;</li>
      <li>maintain inventory, improve website reliability, and prevent abuse;</li>
      <li>comply with legal, accounting, and consumer-protection obligations.</li>
    </ul>

    <h2>3. Cookies and authentication</h2>
    <p>
      We use an HTTP-only session cookie to keep signed-in users authenticated.
      This cookie is necessary for account, cart, wishlist, address, and order
      features. Your authentication provider may also process information under
      its own privacy terms.
    </p>

    <h2>4. When information is shared</h2>
    <p>
      We may share only the information reasonably needed with service
      providers that help us run RedFlint, including authentication, hosting,
      database, image-storage, and courier or delivery providers. We may also
      disclose information when required by law, to protect customers, or to
      investigate fraud or security incidents. We do not sell personal
      information.
    </p>

    <h2>5. Retention and security</h2>
    <p>
      We keep personal information only for as long as it is reasonably needed
      for the purposes described above, including order fulfilment, support,
      fraud prevention, recordkeeping, and legal compliance. We use reasonable
      technical and organisational safeguards, but no internet service can
      guarantee absolute security.
    </p>

    <h2>6. Your choices and requests</h2>
    <p>
      Subject to applicable law and necessary order or legal records, you may
      ask us to access, correct, or delete personal information associated with
      you. You can update certain profile and address details from your account.
      For other requests, use our <Link to="/contact">Contact Us</Link> page.
      We may need to verify your identity before completing a request.
    </p>

    <h2>7. Children</h2>
    <p>
      RedFlint is not intended for children to place orders without the
      involvement and permission of a parent or legal guardian.
    </p>

    <h2>8. Policy changes</h2>
    <p>
      We may update this policy when our services, practices, or legal
      obligations change. The effective date at the top identifies the latest
      version. Material changes will be communicated through the website where
      appropriate.
    </p>

    <h2>9. Contact</h2>
    <p>
      Questions or privacy requests can be submitted through our{" "}
      <Link to="/contact">Contact Us</Link> page.
    </p>
  </LegalPage>
);

export default PrivacyPolicy;
