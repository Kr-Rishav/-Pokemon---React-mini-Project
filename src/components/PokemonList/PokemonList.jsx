import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  //States
  // const [pokemonList, setPokemonList] = useState([]);

  // const [isLoading, setIsLoading] = useState(true);

  // const [pokedexurl, setpokedexurl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );

  // const [nextUrl, setNextUrl] = useState("");

  // const [prevUrl, setPrevUrl] = useState("");

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexurl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  // Function which return a Promise
  async function downloadPokemons() {
    // see this section of code in after ... ok (This is last part of code)
    // setIsLoading(true);

    setPokemonListState({ ...pokemonListState, isLoading: true });

    // 1st STEP
    const response = await axios.get(pokemonListState.pokedexurl);
    // This Downloads list of 20 pokemons,
    // Ex:- {data:{}, config:{}, headers:{}}
    //  console.log(response)

    // 2nd STEP
    const pokemonResults = response.data.results;
    // We extract Array, (array in which 20 obj) from response and In this array there are Name of Pokemon and URL, by the help this url we can get Details of this (pokemon name);
    // Ex:-  (20)
    //  [
    //     {name:"Pokemon Name", url:"https//pokeapi.co/1"},
    //     {name:"Pokemon Name", url:"https//pokeapi.co/1"},
    //     {name:"Pokemon Name", url:"https//pokeapi.co/1"},
    //     {}....... 20{}
    //  ]
    //
    console.log("pokemonResults", pokemonResults);

    //2(a) STEP, see this step after completE the whole code, this is last part of code
    console.log("Response", response.data);
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    // setnextUrl(response.data.next);
    // setPrevUrl(response.data.previous);

    // 3rd STEP
    const pokemonResultPromise = pokemonResults.map((element) =>
      axios.get(element.url)
    );
    // Iterating over the array of "pokemonResults" and Using their url to create an Array of Promises That will download those 20 pokemons details like:- name, image, etc.. and Store in Array.
    // Aim:- Creating a Array in which stored all pokemon's details. that's why use "map()" Method
    // element = {name:'Pokemon Name', url:"https//pokeapi.co/1"}
    // element.url = "url:"https//pokeapi.co/1"
    // console.log(pokemonResultPromise)

    // 4th STEP
    const pokemonData = await axios.all(pokemonResultPromise);
    //Passing the above array, I mean  above 'promise Array' to axios.all()
    // axios.all() Method are like promise.all() Method which are like:-
    // When we give an array to Promise.all() Method then,
    // when all will resolved, then we are able to get it's response in .then()
    // Hence, Now in "pokemonData" = we have the "Array" In which all 20 pokemon's details data likes:- each pokemon name, each Image, etc...
    // Ex:- [
    //       {data:{}, status:222, headers:"AxiosHeaders"},
    //       {data:{}, status:223, headers:"AxiosHeaders"},
    //       {data:{}, status:224, headers:"AxiosHeaders"},
    //       {},........{}
    //      ]
    console.log("4th Step:- PokemonData", pokemonData);

    // 5th STEP
    // Iterating over the array of "pokemonData" and get the each object & by each "element.data", we
    // extract name, image, types, id & stored in pokeListResult.

    // Code is Here
    const pokeListResult = pokemonData.map((element) => {
      const pokemon = element.data;
      // console.log("Pokemon",pokemon);

      return {
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : "sorry",
        types: pokemon.types,
        id: pokemon.id,
      };
    });

    // 6th STEP
    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
    // Update the state here;

    // 7th STEP
    // setIsLoading(false);
    // Update the State also
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexurl]);

  return (
    <div className="pokemon-list-wrapper">
      <h5>Pokemon List</h5>
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading...."
          : pokemonListState.pokemonList.map((elem) => (
              <Pokemon
                name={elem.name}
                image={elem.image}
                key={elem.id}
                id={elem.id}
              />
            ))}
      </div>

      <div className="controls">
        <button
          className="btn"
          id="1"
          disabled={pokemonListState.prevUrl == null}
          onClick={() => {
            const prevToSet = pokemonListState.prevUrl;
            setPokemonListState({
              ...pokemonListState,
              pokedexurl: prevToSet,
            });
          }}
        >
          Prev
        </button>
        <button
          className="btn"
          id="2"
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            const nextToset = pokemonListState.nextUrl;
            setPokemonListState({
              ...pokemonListState,
              pokedexurl: nextToset,
            });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
