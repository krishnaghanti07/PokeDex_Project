import { useEffect, useState } from 'react';
import axios from 'axios';
import "./PokemonList.css"
import Pokemon from '../Pokemon/Pokemon';

function PokemonList () {

    const [pokemonList , setPokemonList] = useState([]) ;
    const [isLoading , setIsLoading] = useState(true);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon' ;

    async function downloadPokemons () {
        const response = await axios.get (POKEDEX_URL); // This Downloads List of 20 Pokemons ...

        // console.log (response.data);
        const pokemonResults = response.data.results ; // We get the array of Pokemons from Results
        // console.log (response.data);

        // Iterating over the Array of 'Pokemons' , and using their url , to create an Array of Promises
        // That will Download those 20 Pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // Passing that Promise Array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // Getting an Array of 20 Pokemon's detailed-data
        // Fetching all the Data after Downloading It ...
        console.log (pokemonData);

        // Now , iterate on the data of each Pokemon ; and Extract id , name , image and types
        const pokiListResult = pokemonData.map((pokeData) => { // Fetch-Out the Necessary Details ...
            const pokemon = pokeData.data ;
            return { // Parsing The json
                id: pokemon.id ,
                name: pokemon.name ,
                image: pokemon.sprites.other.dream_world.front_default ,
                types: pokemon.types ,
            }
        });
        console.log (pokiListResult) ;
        setPokemonList(pokiListResult);
        setIsLoading (false);
    }

    useEffect ( () => {
        downloadPokemons() ;
    } , []);

    return (
        <>
            <div className="pokemon-list-wrapper">
                <div>Pokemon List :</div>
                <div className='pokemon-wrapper'>
                    {(isLoading) ? "Loading ...." : 
                        pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
                    }
                </div>
                <div className='controls'>
                    <button>Prev</button>
                    <button>Next</button>
                </div>
            </div>
        </>
    );
}

export default PokemonList;