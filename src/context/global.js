import React, { createContext, useContext, useEffect, useReducer } from "react"

const GlobalContext = createContext();



// reducer
const reducer = (state, action) => {
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
  
  const allPokemon = async () => {
    const res = await fetch(`${baseUrl}pokemon?limit=20`);
    const data = await res.json();
    console.log(data);
  };
  
  useEffect(() => {
    allPokemon();
  }, [])


  return (
    <GlobalContext.Provider value={{
      ...state,
    }}>
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}