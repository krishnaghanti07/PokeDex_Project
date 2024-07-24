import { Route, Routes } from 'react-router-dom';
import Pokedex from '../components/Pokedex/Pokedex';
import PokemonDetails from '../components/PokemonDetails/PokemonDetails';

function CustomRoutes () {
    return (
        // This will take a Bunch-of-Components
        <Routes> 
            {/* We can define in this Route component ; in which Path , which component will be Rendering */}
            <Route path='/' element={<Pokedex />} />
            <Route path='/pokemon/:id' element={<PokemonDetails />} />
            {/* We're defining a set of Routes ... and Wrap all the Routes into The "Routes-Component" */}
        </Routes>
    );
}

export default CustomRoutes;