import { defineStore } from 'pinia';
import axios from 'axios';
import { Pokemon, PokemonCache } from '../types';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as Pokemon[],
    pokemonCache: {} as PokemonCache,
  }),
  actions: {
    async fetchPokemons() {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=30'
        );
        this.pokemons = response.data.results;
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      }
    },

    async fetchPokemonsData() {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=60'
        );
        const pokemonResults = response.data.results;

        // Fetch detailed information for each pokemon
        const detailedPokemons = await Promise.all(
          pokemonResults.map(async (pokemon: Pokemon) => {
            const details = await axios.get(pokemon.url);
            this.pokemonCache[details.data.name] = details.data;
            return details.data;
          })
        );

        this.pokemons = detailedPokemons;
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      }
    },

    async fetchPokemon(id: string) {
      if (this.pokemonCache[id]) {
        console.log('Returning cached pokemon:', this.pokemonCache[id]);
        return this.pokemonCache[id];
      }
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        this.pokemonCache[id] = response.data;
        return response.data;
      } catch (error) {
        console.error('Error fetching pokemon:', error);
      }
    },
  },
});
