import React from "react";
import PokemonList from "../PokemonList/PokemonList";
import "./Pokemon.css";
import { Link } from "react-router-dom";

function Pokemon({ name, image, id }) {
  return (
    <div className="pokemon">
      <Link to={`/pokemon/${id}`}>
        <div className="pokemon-name">{name}</div>
        <div className="imgContainer">
          <img src={image} alt="Pokemon_img_error" />
        </div>
      </Link>
    </div>
  );
}

export default Pokemon;
