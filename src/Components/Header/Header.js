import { useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import "./header.css";

const Header = ({ searchPokemon }) => {
  const [query, setQuery] = useState("");

  const searchBox = useRef(null);

  const handleCheck = async (val) => {
    searchBox.current.classList.remove("error");
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=898&offset=0"
    );
    const data = await response.json();
    const equal = data.results.find((pokemon) => {
      return pokemon.name === val;
    });

    if (equal === undefined) searchBox.current.classList.add("error");
    else searchPokemon(val);
  };

  return (
    <div className="header">
      {" "}
      <input
        ref={searchBox}
        type="text"
        className="searchbox"
        placeholder="Search Pokémon"
        onInput={(e) => {
          setQuery(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.target.blur();
            handleCheck(query.toLowerCase());
          }
        }}
        onChange={() => {
          searchBox.current.classList.remove("error");
        }}
      />{" "}
      <button
        className="btn-search"
        onClick={() => {
          handleCheck(query.toLowerCase());
        }}
      >
        <BsSearch
          fontSize="1.5rem"
          color="#3F51B5"
          style={{ height: "100%" }}
        />
      </button>
    </div>
  );
};

export default Header;
