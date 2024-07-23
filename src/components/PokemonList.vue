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

defineProps<{
  pokemons: Pokemon[];
}>();
</script>

<style>
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgb(58, 58, 58);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (min-width: 600px) {
  .pokemon-list {
    justify-content: space-between;
  }
}

@media (min-width: 1024px) {
  .pokemon-list {
    gap: 2rem;
  }
}
</style>