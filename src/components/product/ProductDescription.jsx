const ProductDescription = ({ description }) => {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-6 px-5 sm:px-6">
        Product Description
      </h2>

      <div className="bg-base-100 rounded-xl p-5 sm:p-6 border border-base-200">
        <p className="leading-8 text-base-content/80">
          {description}
        </p>
      </div>
    </section>
  );
};

export default ProductDescription;