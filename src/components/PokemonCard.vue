<template>
  <router-link :to="`/pokemon/${pokemon.name}`" class="pokemon-card-link">
    <div class="pokemon-card">
      <h2>{{ pokemon.name }}</h2>
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { Pokemon } from '../types';

defineProps<{
  pokemon: Pokemon;
}>();
</script>

<style scoped>
.pokemon-card-link {
  text-decoration: none;
  color: inherit;
}

.pokemon-card {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
  width: 180px;
  height: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.pokemon-card img {
  max-width: 100%;
  max-height: 100px;
  object-fit: contain;
}

.pokemon-card h2 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

@media (min-width: 600px) {
  .pokemon-card {
    width: 200px;
    height: 170px;
  }

  .pokemon-card img {
    max-height: 120px;
  }

  .pokemon-card h2 {
    font-size: 1.1rem;
  }
}

@media (min-width: 1024px) {
  .pokemon-card {
    width: 220px;
    height: 190px;
  }

  .pokemon-card img {
    max-height: 140px;
  }

  .pokemon-card h2 {
    font-size: 1.2rem;
  }
}
</style>
