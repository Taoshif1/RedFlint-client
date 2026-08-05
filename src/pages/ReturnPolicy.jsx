const ReturnPolicy = () => {
  return (
    <section className="min-h-screen bg-base-100 text-base-content">
      <div className="max-w-5xl mx-auto px-6 py-20">

        <div className="text-center mb-14">
          <h1 className="red-hat text-5xl md:text-6xl text-redflint-gradient mb-4">
            Return & Refund Policy
          </h1>

          <p className="text-base-content/70 text-lg">
            We want you to shop with confidence. If something isn't right,
            we're here to help.
          </p>
        </div>

        <div className="space-y-8">

          {/* Return Policy */}
          <div className="bg-base-200 rounded-box shadow-lg p-8">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Return & Replacement Policy
            </h2>

            <p className="leading-8 text-base-content/80">
              Customer satisfaction is our priority. While we carefully inspect
              every order before shipping, we understand that issues may
              occasionally occur. If you receive a damaged, defective, or
              incorrect product, we will gladly replace it or offer a refund in
              accordance with our policy.
            </p>
          </div>

          {/* Conditions */}
          <div className="bg-base-200 rounded-box shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Return Eligibility
            </h2>

            <ul className="list-disc list-inside space-y-3 text-base-content/80">
              <li>Returns must be requested within <strong>7 days</strong> of delivery.</li>
              <li>Items must be unused, unwashed, and in their original condition.</li>
              <li>All original tags, packaging, and accessories must be included.</li>
              <li>Promotional or free items received with the purchase must also be returned.</li>
              <li>All returned products are subject to inspection before approval.</li>
            </ul>
          </div>

          {/* Reasons */}
          <div className="bg-base-200 rounded-box shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Valid Reasons for Return or Replacement
            </h2>

            <ul className="list-disc list-inside space-y-3 text-base-content/80">
              <li>Damaged or defective product.</li>
              <li>Wrong product delivered.</li>
              <li>Incorrect size shipped (compared to your invoice).</li>
              <li>Incorrect color received.</li>
              <li>Printing or design errors.</li>
              <li>Product significantly differs from its description.</li>
            </ul>
          </div>

          {/* How */}
          <div className="bg-base-200 rounded-box shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              How to Request a Return
            </h2>

            <ol className="list-decimal list-inside space-y-4 text-base-content/80">
              <li>Contact our customer support within 7 days of receiving your order.</li>
              <li>Provide your order number and the reason for your return.</li>
              <li>Include photos if the item is damaged or incorrect.</li>
              <li>Our team will review your request and provide return instructions.</li>
              <li>Once the returned item passes inspection, we will issue a replacement or refund.</li>
            </ol>
          </div>

          {/* Refund */}
          <div className="bg-base-200 rounded-box shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Refund Policy
            </h2>

            <ul className="list-disc list-inside space-y-3 text-base-content/80">
              <li>Refunds are processed after the returned product has been inspected.</li>
              <li>If a replacement is unavailable, a full refund will be issued.</li>
              <li>Shipping charges and Cash on Delivery (COD) fees are non-refundable.</li>
              <li>Online payments will be refunded to the original payment method.</li>
              <li>Refunds are typically completed within <strong>7–10 business days</strong>.</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-primary text-primary-content rounded-box p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Help?
            </h2>

            <p className="mb-2">
              If you have any questions regarding returns or refunds,
              please contact our support team.
            </p>

            <p className="font-semibold">
              📞 +880 1907619125
            </p>

            <p className="font-semibold">
              📧 redflintbd@gmail.com
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReturnPolicy;