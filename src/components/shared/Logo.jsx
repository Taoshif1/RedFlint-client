export default function RedFlintLogo({ compact = false }) {
  return (
    <div
      className={`flex w-fit select-none items-center whitespace-nowrap font-black italic tracking-wider red-hat ${
        compact
          ? "p-1 text-sm min-[360px]:p-1.5 min-[360px]:text-base min-[380px]:text-lg sm:p-3 sm:text-2xl"
          : "p-4 text-2xl"
      }`}
    >
      {/* Double Slash */}
      <span className="text-white mr-1.5">//</span>

      {/* RED Text - theme primary red */}
      <span className="text-primary">RED</span>

      {/* FLINT Pill Block */}
      <span className="bg-base-content text-base-100 px-1.5 py-0.5 rounded-box ml-1 font-black">
        FLINT
      </span>
    </div>
  );
}
