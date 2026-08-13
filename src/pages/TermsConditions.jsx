import { Link } from "react-router";

import LegalPage from "../components/shared/LegalPage";

const TermsConditions = () => (
  <LegalPage title="Terms & Conditions" effectiveDate="13 August 2026">
    <p>
      These Terms &amp; Conditions govern your use of the RedFlint website and
      your purchase of products from us. By using the website or placing an
      order, you agree to these terms and our <Link to="/privacy">Privacy Policy</Link>.
    </p>

    <h2>1. Products and availability</h2>
    <p>
      We try to present product descriptions, colours, images, sizes, prices,
      and stock accurately. Screen settings and photography may cause minor
      visual differences. Products remain subject to availability, and placing
      an order does not reserve stock until our system accepts the order.
    </p>

    <h2>2. Orders and acceptance</h2>
    <p>
      An order submission is your offer to buy the selected products. You must
      provide accurate contact, delivery, and payment-reference information.
      We may contact you to confirm an order. We may reject or cancel an order
      for unavailable stock, incorrect pricing, unverifiable payment,
      suspected fraud, delivery limitations, or other legitimate operational
      reasons. If we cancel an order after confirming payment, we will arrange
      the applicable refund.
    </p>

    <h2>3. Prices, shipping, and payment</h2>
    <p>
      Prices are shown in Bangladeshi Taka (BDT). Shipping charges and any
      free-shipping threshold are displayed at checkout and recalculated by our
      server when the order is submitted. Available methods may include bKash,
      Nagad, and Cash on Delivery, as shown at checkout.
    </p>
    <ul>
      <li>
        For mobile-wallet payments, send the displayed total to the displayed
        RedFlint account and provide the correct transaction ID.
      </li>
      <li>
        For Cash on Delivery, payment is due when the order is delivered. COD
        availability may be limited by location or order circumstances.
      </li>
      <li>
        Never provide a wallet PIN, password, or one-time code to RedFlint.
      </li>
    </ul>

    <h2>4. Delivery</h2>
    <p>
      Delivery estimates are not guaranteed deadlines. Courier capacity,
      incorrect addresses, recipient availability, weather, public disruption,
      and events outside our reasonable control may cause delay. Read our{" "}
      <Link to="/delivery">Delivery information</Link> for current details.
    </p>

    <h2>5. Returns, exchanges, and cancellations</h2>
    <p>
      Return and exchange eligibility, time limits, item-condition requirements,
      and exclusions are described in our <Link to="/return">Return Policy</Link>.
      Contact us as soon as possible if you want to cancel. We cannot guarantee
      cancellation after an order has entered processing or shipment.
    </p>

    <h2>6. Accounts and acceptable use</h2>
    <p>
      You are responsible for information submitted through your account and
      for keeping access to your email and authentication account secure. You
      must not misuse the website, interfere with its operation, attempt
      unauthorised access, submit false payment references, scrape it in a way
      that harms the service, or use it for unlawful or fraudulent activity. We
      may restrict access where reasonably necessary to protect RedFlint and its
      customers.
    </p>

    <h2>7. Intellectual property</h2>
    <p>
      RedFlint branding, original website content, product photography, graphics,
      and design elements are owned by or licensed to RedFlint. You may use the
      website for personal shopping purposes but may not copy, republish, sell,
      or commercially exploit protected content without permission.
    </p>

    <h2>8. Service availability and liability</h2>
    <p>
      We may temporarily suspend features for maintenance, security, or
      operational reasons. To the extent permitted by applicable law, RedFlint
      is not responsible for indirect or consequential loss arising from website
      interruption or events outside our reasonable control. Nothing in these
      terms excludes rights or remedies that cannot legally be excluded,
      including applicable consumer rights.
    </p>

    <h2>9. Governing law and disputes</h2>
    <p>
      These terms are governed by the laws of Bangladesh. Please contact us
      first so we can try to resolve a complaint directly. Any unresolved
      dispute may be taken to the competent authorities or courts in Bangladesh,
      subject to applicable law.
    </p>

    <h2>10. Changes and contact</h2>
    <p>
      We may revise these terms when our services or legal obligations change.
      The effective date identifies the current version. Questions can be sent
      through our <Link to="/contact">Contact Us</Link> page.
    </p>
  </LegalPage>
);

export default TermsConditions;
