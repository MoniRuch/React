import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Order No."
        value={query}
        className={clsx(
          "focus:ring-opacity-50 w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 " +
            "placeholder:text-stone-400 focus:ring focus:ring-yellow-300 focus:outline-none sm:w-64 sm:focus:w-72"
        )}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
