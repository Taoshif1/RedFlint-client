import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";


export default function ExpandableSearch({ onSearch }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Focus the input field automatically when it slides open
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Collapse the bar if clicked outside while empty
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (query === "") {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query]);

  // Send the search text up to the parent component whenever it changes
  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

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
      className="flex items-center bg-base-100 rounded-full border border-base-300 p-2 overflow-hidden shadow-sm transition-all duration-300 ease-in-out"
      style={{ width: isOpen ? "300px" : "48px" }}
    >
      <button
        type="button"
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
            return;
          }

          if (query.trim()) {
            navigate(`/products?search=${encodeURIComponent(query)}`);
          }
        }}
        className="hover:text-primary transition shrink-0 p-1"
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
        value={query}
        onChange={handleInputChange}
        placeholder="Search"
        className="outline-none bg-transparent w-full pl-3 pr-2 transition-opacity duration-200 placeholder:opacity-25 placeholder:text-neutral-content text-sm"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />
    </form>
  );
}
