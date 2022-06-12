import { BsXLg } from "react-icons/bs";
import { typeColors, pokemonColors } from "../../helpers.js";
import "./modal.css";
import StatBar from "../StatBar/StatBar.js";

const statColor = {
  0: "#66BB6A",
  1: "#E57373",
  2: "#4FC3F7",
  3: "#F06292",
  4: "#7E57C2",
  5: "#FFCC80",
};

const Modal = ({ isOpen, toggleModal, pokemon, pokemonSpecies }) => {
  if (isOpen) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  const closeModal = (e) => {
    if (e.target.className === "modal") toggleModal();
  };

  const getDescription = (species) => {
    const p = species.flavor_text_entries.find((i) => {
      return i.language.name === "en";
    });

    return p.flavor_text.replace(/(\r\n|\n|\r|\f)/gm, ` `);
  };

  return (
    <>
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-dialog">
            <div className="modal-header">
              <h2 className="pokemon-name"> {pokemon.name} </h2>
              <button className="btn-dismiss" onClick={toggleModal}>
                <BsXLg
                  fontSize="1.2rem"
                  color="#ffffff"
                  style={{ height: "100%" }}
                />
              </button>
            </div>
            <div className="modal-body">
              <div className="flex-items">
                <div
                  className="pokemon-img-wrapper"
                  style={{
                    backgroundColor: pokemonColors[pokemonSpecies.color.name],
                  }}
                >
                  <img
                    className="pokemon-img"
                    src={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
                    alt=""
                  />
                </div>
                <div className="pokemon-basic-info">
                  <span>
                    <h3>{pokemon.id}</h3>
                    <p>Number</p>
                  </span>
                  <span>
                    <h3>{(pokemon.weight / 4.536).toFixed(1)} lbs</h3>
                    <p>Weight</p>
                  </span>
                  <span>
                    <h3>
                      {Math.round(
                        (pokemon.height / 3.048) * 100 + Number.EPSILON
                      ) / 100}{" "}
                      ft
                    </h3>
                    <p>Height</p>
                  </span>
                </div>
              </div>
              <div className="flex-items">
                <p className="pokemon-description">
                  {getDescription(pokemonSpecies)}
                </p>
                <h3 style={{ padding: "1rem 0" }}>Type:</h3>
                <div>
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
                <h3 style={{ paddingTop: "2rem" }}>Base Stats:</h3>
                <div className="pokemon-stats">
                  {pokemon.stats.map((stat, index) => {
                    return (
                      <StatBar
                        key={index}
                        bgcolor={statColor[index]}
                        value={Math.round((stat.base_stat / 255) * 100)}
                        label={stat.stat.name}
                        basestat={stat.base_stat}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
