import React from 'react'
import PokemonList from '../PokemonList/PokemonList'
import './Pokemon.css'


function Pokemon({name, image}) {
  return (
    <div className='pokemon'>
              <div className='pokemon-name'>{name}</div>
              <div className='imgContainer'><img src={image} alt="" /></div>
    </div>
  )
}

export default Pokemon