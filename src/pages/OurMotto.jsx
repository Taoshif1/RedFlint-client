const OurMotto = () => {
  const mottos = [
    {
      number: "01",
      title: "Quality Without Compromise",
      description:
        "We choose clothing that feels good, looks sharp, and is made to remain part of your wardrobe beyond a single season.",
    },
    {
      number: "02",
      title: "Style With Confidence",
      description:
        "We believe the right clothing should help you express yourself naturally and confidently, without trying too hard.",
    },
    {
      number: "03",
      title: "Customers Come First",
      description:
        "From browsing to delivery and after-sales support, we aim to make every step simple, honest, and dependable.",
    },
  ];

  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-base-300">
        <div className="absolute inset-0 bg-redflint-gradient opacity-40" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-24">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-primary">
              What We Stand For
            </p>

            <h1 className="red-hat text-5xl leading-tight md:text-7xl lg:text-8xl">
              Clothing should not only be worn.
              <span className="text-redflint-gradient block">
                It should be felt.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-base-content/70 md:text-xl">
              At RedFlint, we create a shopping experience built around strong
              style, reliable quality, and genuine customer care.
            </p>
          </div>
        </div>
      </section>

      {/* Main Motto */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="border-redflint-gradient rounded-box p-8 md:p-14">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  Our Motto
                </p>

                <h2 className="red-hat text-4xl leading-tight md:text-6xl">
                  Wear confidence.
                  <span className="block text-primary">Live boldly.</span>
                </h2>
              </div>

              <div className="space-y-5 text-lg leading-8 text-base-content/70">
                <p>
                  We believe clothing is more than fabric. It reflects your
                  personality, your attitude, and the way you carry yourself.
                </p>

                <p>
                  That is why we focus on products that combine style, comfort,
                  durability, and value—without making the shopping experience
                  complicated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motto Cards */}
      <section className="bg-base-200 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Our Principles
            </p>

            <h2 className="red-hat text-4xl md:text-5xl">
              The ideas behind every decision we make.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-box border border-base-300 bg-base-100 p-8">
              <span className="red-hat text-5xl text-primary">01</span>

              <h3 className="red-hat mt-8 text-2xl">
                Quality Without Compromise
              </h3>

              <p className="mt-4 leading-7 text-base-content/70">
                We choose clothing that looks good, feels comfortable, and lasts
                beyond a single season.
              </p>
            </div>

            <div className="rounded-box border border-base-300 bg-base-100 p-8">
              <span className="red-hat text-5xl text-primary">02</span>

              <h3 className="red-hat mt-8 text-2xl">Style With Confidence</h3>

              <p className="mt-4 leading-7 text-base-content/70">
                We believe the right clothing should help you express yourself
                with confidence.
              </p>
            </div>

            <div className="rounded-box border border-base-300 bg-base-100 p-8">
              <span className="red-hat text-5xl text-primary">03</span>

              <h3 className="red-hat mt-8 text-2xl">Customers Come First</h3>

              <p className="mt-4 leading-7 text-base-content/70">
                We aim to make shopping, delivery, and customer support simple
                and reliable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Promise */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-primary">
            Our Promise
          </p>

          <blockquote className="red-hat text-3xl leading-tight md:text-5xl">
            “Every order should deliver more than clothing—it should deliver
            confidence, satisfaction, and trust.”
          </blockquote>

          <div className="mx-auto mt-10 h-1 w-24 rounded-full bg-primary" />
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-primary px-6 py-20 text-primary-content">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="red-hat text-4xl md:text-6xl">
            Built for style. Backed by trust.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-content/80">
            RedFlint is committed to giving you clothing you can wear with
            confidence and service you can depend on.
          </p>
        </div>
      </section>
    </main>
  );
};

export default OurMotto;
