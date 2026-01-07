import { useState, useEffect, useRef } from "react";
import { searchLocations } from "../api/weatherApi";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  // Autocompletado
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const results = await searchLocations(query);
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  // Cerrar sugerencias al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    onSearch(query);
    setQuery("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (city) => {
    onSearch(city);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <nav>
      <form onSubmit={handleSubmit} ref={containerRef}>
        <div className="search_container">
          <input
            type="text"
            className="search_area"
            placeholder="Search for a location"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {suggestions.length > 0 && (
            <div className="suggestions_box">
              {suggestions.map((loc) => (
                <div
                  key={`${loc.name}-${loc.country}`}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(loc.name)}
                >
                  {loc.name}, {loc.country}
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="search_button">
          Search location
        </button>
      </form>
    </nav>
  );
}

export default SearchBar;

