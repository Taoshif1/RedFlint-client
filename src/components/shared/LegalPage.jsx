import { useEffect } from "react";

const LegalPage = ({ title, effectiveDate, children }) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | RedFlint`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="border-b border-base-300 pb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          RedFlint Legal
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-base-content/60">
          Effective date: {effectiveDate}
        </p>
      </header>

      <div className="prose prose-neutral mt-8 max-w-none text-base-content [&_a]:text-primary [&_h2]:mt-9 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:my-2 [&_p]:leading-8">
        {children}
      </div>
    </main>
  );
};

export default LegalPage;
