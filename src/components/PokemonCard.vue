<template>
  <router-link :to="`/pokemon/${pokemon.name}`">
    <div class="pokemon-card">
      <h2>{{ pokemon.name }}</h2>
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { Pokemon } from '../types';

const props = defineProps<{
  pokemon: Pokemon;
}>();


</script>

<style>
.pokemon-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  text-align: center;
  border-radius: 8px;
  width: 260px;
}
</style>
