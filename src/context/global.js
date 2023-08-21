import React, { createContext, useContext, useEffect, useReducer, useState } from "react"

const GlobalContext = createContext();

// actions
const LOADING = "LOADING";
const GET_POKEMON = "GET_POKEMON";
const GET_ALL_POKEMON = "GET_ALL_POKEMON";
const GET_ALL_POKEMON_DATA = "GET_ALL_POKEMON_DATA";
const GET_SEARCH = "GET_SEARCH";
const GET_POKEMON_DATABASE = "GET_POKEMON_DATABASE";
const NEXT = "NEXT";

// reducer
const reducer = (state, action) => {
  switch(action.type){
    case LOADING: 
      return {...state, loading: true};
    case GET_ALL_POKEMON: 
      return { ...state, allPokemon: action.payload, loading: false};    
  }
  return state;
}
export const GlobalProvider = ({children}) => {

  const baseUrl = "https://pokeapi.co/api/v2/"
  
  const initialState = {
    allPokemon: [], // initial 20 items
    pokemon: {}, // inidividual properties of a pokemen
    pokemonDatabase: [], // stores all pokemon items in db
    searchResults: [], // 
    loading: false
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [allPokemonData, setAllPokemonData] = useState([]);
  
  const allPokemon = async () => {
    const res = await fetch(`${baseUrl}pokemon?limit=20`);
    const data = await res.json();
    dispatch({ type: "GET_ALL_POKEMON", payload: data.results });

    // fetch character data
    const allPokemonData = [];
    for (const pokemon of data.results) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      allPokemonData.push(pokemonData)
    }
    setAllPokemonData(allPokemonData);
  };
  
  useEffect(() => {
    allPokemon();
  }, [])


  return (
    <GlobalContext.Provider value={{
      ...state,
      allPokemonData
    }}>
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}