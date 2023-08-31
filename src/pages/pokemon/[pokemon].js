import { useGlobalContext } from '@/context/global';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styles from "@styles/Pokemon.module.css"

function Pokemon() {
   const router = useRouter();
   const { pokemon } = router.query;
   const { getPokemon, loading, pokemon: pokemonItem } = useGlobalContext();
   useEffect(() => {
      if(pokemon) {
         getPokemon(pokemon);
      }
   }, [])

   let myLink = ""
   if (pokemonItem?.sprites?.other){
      const {"official-artwork": link} = pokemonItem?.sprites?.other
      myLink = link.front_default
   }
   console.log(myLink);      
   
   console.log(pokemonItem)

   return (
      <>
      {pokemonItem && (
         <>
         <div>
            <img src={
               pokemonItem?.sprites?.other?.home.front_default
               ? pokemonItem?.sprites?.other?.home.front_default
               : myLink} alt='' />
         </div>
         <div>
            <h2>{pokemonItem?.name}</h2>
            <div>
               <h5>Name: </h5>
               <p>{pokemonItem?.name}</p>
            </div>
            <div>
               <h5>Type: </h5>
               <p>{pokemonItem?.types?.map((type) => {
                  return type.type.name
               })}</p>
            </div>
         </div>
         
         </>
         )}
      </>
   );
}

export default Pokemon