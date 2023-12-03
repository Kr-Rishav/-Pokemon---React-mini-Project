import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  // Async Function
  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log("Response", response)

    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((el) => el.type.name),
      id: response.data.id
    });

    console.log("Main object- ", response.data);
    
  }

  //useEffect
  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemon-details-wrapper">
      <div className="pokemon-name">name is : {pokemon.name}</div>
      <div className="pokemon-id">id is : {pokemon.id}</div>

      <div className="pokemon-image">
        <img src={pokemon.image} alt="error_img" />
      </div>
      <div className="height">Height: {pokemon.height}</div>
      <div className="weight">Weight: {pokemon.weight}</div>
      <div className="types">
        {pokemon.types && pokemon.types.map((t)=><div key={t}>Types :- {t}</div>)}
      </div>
    </div>
  );
}

export default PokemonDetails;
