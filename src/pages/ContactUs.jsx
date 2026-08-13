const ContactUs = () => {
  return (
    <section className="min-h-screen bg-base-100 text-base-content">
      <div className="max-w-5xl mx-auto px-6 py-24">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="red-hat text-5xl md:text-6xl text-redflint-gradient mb-6">
            Contact Us
          </h1>

          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Have a question about your order or our products? We'd love to hear
            from you. Reach out to us through our social media platforms, and
            our team will get back to you as soon as possible.
          </p>
        </div>

        {/* Social Cards */}
        <div className="space-y-6">

          {/* Facebook */}
          <a
            href="https://www.facebook.com/redflintbd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-base-200 rounded-box p-6 hover:border hover:border-primary transition duration-300"
          >
            <div className="flex items-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className="fill-current text-primary"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>

              <div>
                <h2 className="font-bold text-xl">Facebook</h2>
                <p className="text-base-content/70">
                  Follow us for updates and message us anytime.
                </p>
              </div>
            </div>

            <span className="text-primary font-semibold">
              Visit →
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/redflintclothing/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-base-200 rounded-box p-6 hover:border hover:border-primary transition duration-300"
          >
            <div className="flex items-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className="fill-current text-primary"
              >
                <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm8.75 1a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
              </svg>

              <div>
                <h2 className="font-bold text-xl">Instagram</h2>
                <p className="text-base-content/70">
                  Discover our newest collections and exclusive updates.
                </p>
              </div>
            </div>

            <span className="text-primary font-semibold">
              Visit →
            </span>
          </a>
        </div>

        <div className="text-center mt-12">
          <p className="text-base-content/70">
            We usually respond within <span className="text-primary font-semibold">24 hours</span>.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;
