import { defineStore } from 'pinia';
import axios from 'axios';
import { Pokemon, PokemonCache } from '../types';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    // List of Pokemon with basic data
    pokemons: [] as Pokemon[],
    // Cache to store detailed Pokemon data
    pokemonCache: {} as PokemonCache,
    isLoading: false,
  }),
  actions: {
    // Fetch detailed data for each Pokemon and store in cache
    async fetchPokemonsData() {
      this.isLoading = true;
      try {
        if (this.pokemons.length > 0) {
          return;
        }

        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=200'
        );
        const pokemonResults = response.data.results;

        // Fetch detailed data for each Pokemon
        const detailedPokemons = await Promise.all(
          pokemonResults.map(async (pokemon: Pokemon) => {
            if (this.pokemonCache[pokemon.id]) {
              return this.pokemonCache[pokemon.id];
            } else {
              const details = await axios.get(pokemon.url);
              this.pokemonCache[details.data.id] = details.data;
              return details.data;
            }
          })
        );

        this.pokemons = detailedPokemons;
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Fetch detailed data for a single Pokemon by ID
    async fetchPokemon(id: string) {
      this.isLoading = true;
      // Return cached data if available
      if (this.pokemonCache[id]) {
        this.isLoading = false;
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
      } finally {
        this.isLoading = false;
      }
    },
  },
});
