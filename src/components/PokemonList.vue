<template>
  <div class="pokemon-list">
    <PokemonCard 
      v-for="pokemon in pokemons" 
      :key="pokemon.name" 
      :pokemon="pokemon" 
    />
  </div>
</template>

<script setup lang="ts">
import PokemonCard from './PokemonCard.vue';
import { Pokemon } from '../types';

const props = defineProps<{
  pokemons: Pokemon[];
}>();

</script>


<style>
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>