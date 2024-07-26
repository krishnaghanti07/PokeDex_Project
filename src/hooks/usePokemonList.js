// Our "Functions" are become more & more 'Testable' ... 
// In Future The individual-testing of The "Hooks" become Easier ...
// We can segregate the UI-component for It's own UI-Logic ...

import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonList() {
     // We've to use This Single useState everywhere as per our Requirment ...
     const [pokemonListState , setPokemonListState] = useState ({
        pokemonList: [] ,
        isLoading: true , 
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon' ,
        nextUrl: '' ,
        prevUrl: '' ,
    });

    async function downloadPokemons () {
        // setIsLoading(true);

            setPokemonListState ((state) => ({
                ...state , 
                isLoading: true
            }));
    
            const response = await axios.get (pokemonListState.pokedexUrl); // This Downloads List of 20 Pokemons ...
    
            const pokemonResults = response.data.results ; // We get the array of Pokemons from Results
            
            console.log ("response ise" , response.data.pokemon);
            console.log (pokemonListState);
    
            setPokemonListState ((state) => ({
                ...state , 
                nextUrl: response.data.next , 
                prevUrl: response.data.previous
            }));

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
            // console.log (pokiListResult) ;
            setPokemonListState ((state) => ({
                ...state ,
                pokemonList: pokiListResult ,
                isLoading: false ,
            }));
            // setPokemonList(pokiListResult);
            // setIsLoading (false);
    }

    useEffect(() => {
        downloadPokemons();
    } , [pokemonListState.pokedexUrl]);

    return [pokemonListState , setPokemonListState];
}

export default usePokemonList;