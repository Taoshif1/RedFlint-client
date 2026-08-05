import React from "react";

const Delivery = () => {
  return (
    <section className="min-h-screen bg-base-100 text-base-content">
      <div className="max-w-5xl mx-auto px-6 py-24">
        {/* Page Heading */}
        <div className="text-center mb-16">
          <h1 className="red-hat text-5xl md:text-6xl text-redflint-gradient mb-6">
            Delivery Information
          </h1>

          <p className="max-w-2xl mx-auto text-lg leading-8 text-base-content">
            We deliver our products throughout Bangladesh using trusted
            third-party courier services.
          </p>
        </div>

        <div className="space-y-8">
          {/* Delivery Service */}
          <div className="bg-base-200 rounded-box p-8 border border-base-300">
            <h2 className="red-hat text-2xl md:text-3xl text-primary mb-4">
              Nationwide Delivery
            </h2>

            <p className="leading-8 text-base-content">
              We proudly deliver our products to customers all across
              Bangladesh through trusted third-party courier partners. While we
              do not currently operate our own delivery service, we work closely
              with reliable logistics providers to ensure your orders are
              delivered safely and efficiently.
            </p>

            <p className="leading-8 text-base-content mt-4">
              Once your order is confirmed, it will be carefully packed and
              handed over to our courier partner. The courier may contact you
              before delivery whenever necessary.
            </p>
          </div>

          {/* Delivery Time */}
          <div className="bg-base-200 rounded-box p-8 border border-base-300">
            <h2 className="red-hat text-2xl md:text-3xl text-primary mb-6">
              Estimated Delivery Time
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-base-300 rounded-box p-6">
                <h3 className="text-xl font-bold text-base-content mb-2">
                  Inside Dhaka
                </h3>

                <p className="leading-7 text-base-content">
                  Estimated delivery within{" "}
                  <strong>2–3 working days.</strong>
                </p>
              </div>

              <div className="bg-base-300 rounded-box p-6">
                <h3 className="text-xl font-bold text-base-content mb-2">
                  Outside Dhaka
                </h3>

                <p className="leading-7 text-base-content">
                  Estimated delivery within{" "}
                  <strong>3–5 working days.</strong>
                </p>
              </div>
            </div>
          </div>
          {/* Order Process */}
          <div className="bg-base-200 rounded-box p-8 border border-base-300">
            <h2 className="red-hat text-2xl md:text-3xl text-primary mb-6">
              Order Process
            </h2>

            <ol className="list-decimal list-inside space-y-4 leading-8 text-base-content">
              <li>Place your order through our website.</li>
              <li>Our team will confirm and prepare your order.</li>
              <li>Your package will be handed over to our courier partner.</li>
              <li>The courier may contact you before delivery.</li>
              <li>Receive your order and check the package condition.</li>
            </ol>
          </div>

          {/* Important Information */}
          <div className="bg-base-200 rounded-box p-8 border border-base-300">
            <h2 className="red-hat text-2xl md:text-3xl text-primary mb-6">
              Important Information
            </h2>

            <ul className="list-disc list-inside space-y-4 leading-8 text-base-content">
              <li>
                Delivery times may vary because of weather, holidays, courier
                delays, or other unexpected situations.
              </li>

              <li>
                Please provide a complete delivery address and an active phone
                number.
              </li>

              <li>
                Our courier partner may contact you before attempting delivery.
              </li>

              <li>
                If your package appears damaged or tampered with, contact us
                immediately before accepting it.
              </li>

              <li>
                Delivery charges may vary depending on the destination and
                courier service.
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="bg-primary rounded-box p-8 text-center text-primary-content">
            <h2 className="red-hat text-3xl mb-4">
              Need Help With Your Delivery?
            </h2>

            <p className="text-lg leading-8">
              If you have any questions about your shipment or delivery status,
              our customer support team is ready to assist you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;