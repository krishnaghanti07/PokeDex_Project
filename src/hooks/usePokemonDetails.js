import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails (id) {
    // const {id} = useParams();
    const [pokemon , setPokemon] = useState({});
    // console.log (id);
    // let pokemonListHookResponse = [] ;
    async function downloadPokemon () {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`)
        const pokemonOfSameTypes = axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`)
        // console.log (response.data);
        // console.log ('S' , pokemonOfSameTypes);
        setPokemon((state) => ({
            ...state ,
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            // similarPokemons: pokemonOfSameTypes.data.pokemon
            //.slice(0 , 10)
        }));  
        
        pokemonOfSameTypes.then((response) => {
            setPokemon((state) => ({
                ...state ,
                similarPokemons: response.data.pokemon
                //.slice(0 , 10)
            }));  
        })
        
        console.log (response.data.types);
        setPokemonListState({...pokemonListState , type: response.data.types ? response.data.types[0].type.name : '' })
        
    }

    const [pokemonListState , setPokemonListState] = usePokemonList();

    useEffect (() => {
        downloadPokemon();
        console.log ("list" , pokemon.types , pokemonListState);
    } , []);

    return [pokemon];
}

export default usePokemonDetails;