import React from 'react'
import Search from '../search/Search'
// Import CSS 
import './pokedex.css'
import PokemonList from '../PokemonList/PokemonList'





function Pokedex() {
  return (
              <div className='pokedex-wrapper'>
                          
                            <Search/>
                            <PokemonList/>

              </div>
  )
}

export default Pokedex