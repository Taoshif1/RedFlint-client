import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

export default function SearchBar({ alwaysOpen = false }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const expanded = alwaysOpen || isOpen;

  // Focus the input field automatically when it slides open
  useEffect(() => {
    if (expanded) {
      inputRef.current?.focus();
    }
  }, [expanded]);

  // Collapse the bar if clicked outside while empty
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (!alwaysOpen && query === "") {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [alwaysOpen, query]);

  // Send the search text up to the parent component whenever it changes
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit}
      role="search"
      className={`flex h-11 items-center overflow-hidden rounded-full border border-base-300 bg-base-100 px-2 shadow-sm transition-[width] duration-300 ease-in-out ${
        alwaysOpen
          ? "w-full"
          : expanded
            ? "w-[min(18rem,calc(100vw-8rem))]"
            : "w-11"
      }`}
    >
      <button
        type="button"
        onClick={() => {
          if (!expanded) {
            setIsOpen(true);
            return;
          }

          if (query.trim()) {
            navigate(`/products?search=${encodeURIComponent(query)}`);
          }
        }}
        className="grid min-h-9 min-w-9 shrink-0 place-items-center rounded-full transition hover:text-primary"
        aria-label={expanded ? "Search products" : "Open product search"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* The expanding low-opacity text field */}
      <input
        ref={inputRef}
        type="text"
        name="search"
        value={query}
        onChange={handleInputChange}
        placeholder="Search"
        tabIndex={expanded ? 0 : -1}
        aria-hidden={!expanded}
        className="w-full bg-transparent py-2 pl-2 pr-2 text-base outline-none transition-opacity duration-200 placeholder:text-base-content/40 sm:text-sm"
        style={{
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? "auto" : "none",
        }}
      />
    </form>
  );
}
