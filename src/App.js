import { useEffect, useState } from "react";
import "./index.css";
import Card from './Components/Card/Card';
import Nav from './Components/Nav/Nav';
import Loader from "./Components/Loader/Loader";
import PokeBallLoader from "./assets/pokeball-loader.svg";
import Modal from "./Components/Modal/Modal";
import Header from "./Components/Header/Header";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentURL, setCurrentURL] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [startRange, setStartRange] = useState(1);
  const [showModal, setShowModal] = useState(false);
  
  const [card_pokemonDescription, setCard_pokemonDescription] = useState([]);
  const [card_pokemonColor, setCard_pokemonColor] = useState([]);
  
  const [pokemon, setPokemon] = useState([]);
  const [pokemonSpecies, setPokemonSpecies] = useState([]);

  const fetchPokeAPI = async ({signal}) => {
    try {
      setIsLoading(true);
      const response = await fetch(currentURL, {signal});
      const data = await response.json();
      setNextURL(data.next);
      setPrevURL(data.previous);
      await fetchPokemonList(data.results, {signal});
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchPokemonList = async (results, {signal}) => {
    try {
      const _pokemonList = await Promise.all(results.map(async pokemon=>{
      const response = await fetch(pokemon.url, {signal});
      const data = await response.json();
      return data;
    }))
      await fetchPokemonSpecies(_pokemonList, {signal});
      setPokemonList(_pokemonList);
      setStartRange(_pokemonList[0].id)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchPokemonSpecies = async (species, {signal}) => {
    try {
      const description = await Promise.all(species.map(async pokemon => {
      const response = await fetch(pokemon.species.url, {signal});
      const data = await response.json();
      return data;
    }))
    const color = description.map((species)=>{
      return species.color.name
    });
    setCard_pokemonColor(color);
    const en = description.map((species)=>{
      return species.flavor_text_entries.find((i)=>{
          return i.language.name === 'en';
        })
    });
    setCard_pokemonDescription(en);
    } catch (error) {
      console.log(error);
    }
  }

  const searchPokemon = async (pokemon) => {
    try {
      setIsLoading(true);
      const pokemon_response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const pokemon_data = await pokemon_response.json();
      setPokemon(pokemon_data);
      const species_response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
      const species_data = await species_response.json();
      setPokemonSpecies(species_data);
      !showModal && setShowModal(true); 
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    let controller = new AbortController();
    let signal = controller.signal;
    fetchPokeAPI({signal});
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  },[currentURL]);

  const gotoNextPage = () => {
    setCurrentURL(nextURL);
  }

  const gotoPrevPage = () => {
    setCurrentURL(prevURL);
  }

  const toggleModal = (e) => {
   setShowModal(!showModal)
  };

  return (
    <>
      <Header searchPokemon = {searchPokemon}/>
      <main className="grid">
        <Modal isOpen={showModal} toggleModal={toggleModal} pokemon={pokemon} pokemonSpecies={pokemonSpecies} searchPokemon={searchPokemon} isLoading={isLoading}/>
        { isLoading && <Loader icon={PokeBallLoader} message="Catching Pokémon..."/> } 
        { pokemonList.map((pokemon, index)=>{
          let description = card_pokemonDescription[index].flavor_text;
          description = description.replace(/(\r\n|\n|\r|\f)/gm,` `);
          return(
            pokemon.id <= 898 && <Card key={pokemon.id} pokemon={pokemon} 
                                  description={description} 
                                  color={card_pokemonColor[index]}
                                  searchPokemon = {searchPokemon}
                                  />
          )})
        }
        <Nav gotoNextPage={!isLoading && startRange < 881 ? gotoNextPage : null} 
        gotoPrevPage={!isLoading && prevURL ? gotoPrevPage : null} 
        startRange={startRange} endRange={startRange + pokemonList.length - 1}
        showModal = {showModal}/>
      </main>
    </>
  );
}

export default App;