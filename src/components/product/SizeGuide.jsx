import SizeGuideImage from "../../assets/size-guide.jpg";

const SizeGuide = () => {
  return (
    <section className="mt-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Size Guide
      </h2>

      <div className="flex justify-center items-center">
        <img
          src={SizeGuideImage}
          alt="RedFlint Shirt Size Guide"
          className="
            w-auto
            max-w-full
            max-h-[65vh]
            md:max-h-[72vh]
            object-contain
            rounded-xl
            shadow-md
          "
        />
      </div>
    </section>
  );
};

export default SizeGuide;