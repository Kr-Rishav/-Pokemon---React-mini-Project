import { Link } from "react-router-dom";
import "./App.css";
import Pokedex from "./components/Pokedex/Pokedex";
import PokemonList from "./components/PokemonList/PokemonList";
import Search from "./components/search/Search";
import CustomRoutes from "./routes/CustomRoutes";

function App() {
  return (
    <div className="outer">
    <Link to={'/'}>
    <h1 id='pokedex-heading'>Pokedex</h1> 
    </Link>
      <CustomRoutes/>
    </div>
  );
}

export default App;
