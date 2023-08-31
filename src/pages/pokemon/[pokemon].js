import { useGlobalContext } from '@/context/global';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styles from "@/styles/Pokemon.module.css";

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

   // pokemon bg colors
   const pkColors = [
      "#a2d9ce",
      "#f5b7b1",
      "#c39bd3",
      "#f5cba7",
      "#85c1e9",
      "#76d7c4"
   ];

   const randomColor = pkColors[Math.floor(Math.random() * pkColors.length)];

   console.log(myLink);      
   
   console.log(pokemonItem)

   return (
      <div className={styles.PokemonBg} style={{
         background: !loading && randomColor
      }}>
      {pokemonItem && (
         <>
         <div className={styles.PokemonImage}>
            <img src={
               pokemonItem?.sprites?.other?.home.front_default
               ? pokemonItem?.sprites?.other?.home.front_default
               : myLink} alt='' />
         </div>
         <div className={styles.PokemonBody}>
            <h2>{pokemonItem?.name}</h2>
            <div className={styles.PokemonInfo}>
               <div className={styles.PokemonInfoItem}>
                  <h5>Name: </h5>
                  <p>{pokemonItem?.name}</p>
               </div>
               <div className={styles.PokemonInfoItem}>
                  <h5>Type: </h5>
                  <p>{pokemonItem?.types?.map((type) => {
                     return  <p key={type.type.name}>{type.type.name},</p>
                  })}</p>
               </div>
            </div>
         </div>
         
         </>
         )}
      </div>
   );
}

export default Pokemon