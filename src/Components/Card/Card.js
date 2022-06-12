import { useState } from "react";
import { typeColors, pokemonColors } from "../../helpers.js";
import PokeBallPlaceholder from "../../assets/pokeball-loader-white.svg";
import "./card.css";

const Card = ({ pokemon, description, color, searchPokemon }) => {
  const paddedIndex = ("00" + pokemon.id).slice(-3);
  const [imgIsLoaded, setImgIsLoaded] = useState(false);

  return (
    <article
      className="card"
      onClick={() => {
        searchPokemon(pokemon.id);
      }}
    >
      <div
        className="card-img-bg"
        style={{ backgroundColor: pokemonColors[color] }}
      >
        {imgIsLoaded ? null : (
          <div
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "100%",
              top: "0",
              left: "0",
              opacity: "15%",
              backgroundImage: `url(${PokeBallPlaceholder})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        )}
        <img
          style={imgIsLoaded ? {} : { display: "none" }}
          src={pokemon.sprites.other["official-artwork"].front_default}
          onLoad={() => setImgIsLoaded(true)}
          alt={pokemon.name}
        />
      </div>
      <div className="card-body">
        <h3>
          {pokemon.name}
          <span className="pokemon-id">{"#" + paddedIndex}</span>
        </h3>
        <p>{description}</p>
      </div>
      <div className="card-footer">
        {pokemon.types.map((type, index) => {
          return (
            <span
              key={index}
              className="badge"
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {type.type.name}
            </span>
          );
        })}
      </div>
    </article>
  );
};

export default Card;
