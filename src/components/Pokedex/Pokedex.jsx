import React from 'react'
import Search from '../search/Search'
// Import CSS 
import './pokedex.css'



function Pokedex() {
  return (
              <div className='pokedex-wrapper'>
                          <h1 id='pokedex-heading'>Pokedex</h1> 
                            <Search/>

              </div>
  )
}

export default Pokedex