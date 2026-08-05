const AboutUs = () => {
  return (
    <section className="min-h-screen bg-base-100 text-base-content">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="red-hat text-5xl md:text-6xl text-redflint-gradient mb-6">
            About Us
          </h1>

          <p className="text-base-content/70 text-lg max-w-3xl mx-auto">
            Fashion is more than clothing—it's a way to express confidence,
            personality, and individuality.
          </p>
        </div>

        <div className="bg-base-200 rounded-box p-8 md:p-12 space-y-8 shadow-xl">

          <p className="text-lg leading-8 text-base-content/80">
            We are passionate about bringing stylish, comfortable, and
            high-quality clothing to customers who value both fashion and
            everyday comfort. Every item in our collection is carefully selected
            with attention to quality, design, and durability.
          </p>

          <p className="text-lg leading-8 text-base-content/80">
            Our goal is to make online shopping simple and enjoyable. From
            trendy everyday wear to timeless essentials, we strive to offer
            clothing that helps you look and feel your best.
          </p>

          <p className="text-lg leading-8 text-base-content/80">
            Customer satisfaction is our highest priority. Whether you have
            questions about sizing, your order, or delivery, our team is
            committed to providing fast, friendly, and reliable assistance.
          </p>

          <p className="text-lg leading-8 text-base-content/80">
            We believe that trust is earned through quality products, honest
            service, and a smooth shopping experience. Thank you for choosing
            us—we're excited to be part of your style journey.
          </p>

          <div className="border-t border-neutral pt-8">
            <h2 className="red-hat text-2xl text-primary mb-6">
              Why Shop With Us?
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-base-300 p-5 rounded-box">
                Premium Quality Fabrics
              </div>

              <div className="bg-base-300 p-5 rounded-box">
                Modern & Trendy Collections
              </div>

              <div className="bg-base-300 p-5 rounded-box">
                Secure Online Shopping
              </div>

              <div className="bg-base-300 p-5 rounded-box">
                Customer Satisfaction First
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;