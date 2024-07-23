<template>
  <router-link to="/" class="back-link">Back to home</router-link>
  <Loader v-if="store.isLoading" />
  <div v-else-if="pokemon" class="pokemon-details">
    <h1>{{ pokemon.name }}</h1>
    <img
      :src="imageSrc ?? ''"
      @mouseenter="showBackImage"
      @mouseleave="showFrontImage"
      alt="pokemon image"
      class="pokemon-image"
    />
    <div class="info">
      <div class="measures">
        <p><span>Height:</span> {{ pokemon.height }}</p>
        <p><span>Weight:</span> {{ pokemon.weight }}</p>
      </div>
      <p>
        <span>Types:</span>
        {{ pokemon.types.map((type) => type.type.name).join(', ') }}
      </p>
    </div>
    <div class="stats">
      <h2>Stats</h2>
      <ul>
        <li v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat">
          <span class="stat-name">{{ stat.stat.name }}</span>
          <div class="stat-bar">
            <div class="stat-value" :style="{ width: stat.base_stat + '%' }">
              {{ stat.base_stat }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { usePokemonStore } from '../store/pokemon';
import { onMounted, ref, Ref } from 'vue';
import { Pokemon } from '../types';
import Loader from '../components/Loader.vue';

const store = usePokemonStore();
const route = useRoute();
const pokemonId: string = route.params.id as string;
const pokemon: Ref<Pokemon | null> = ref(null);
const imageSrc = ref<string | null>(null);

// Fetch Pokemon data based on the ID from the route parameters
const loadPokemon = async () => {
  pokemon.value = await store.fetchPokemon(pokemonId);
  imageSrc.value = pokemon.value?.sprites.front_default || null;
};

// Show the back image when mouse enters the image
const showBackImage = () => {
  imageSrc.value = pokemon.value?.sprites.back_default || null;
};

// Show the front image when mouse leaves the image
const showFrontImage = () => {
  imageSrc.value = pokemon.value?.sprites.front_default || null;
};

onMounted(() => {
  loadPokemon();
});
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: rgb(255,0,0);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.back-link:hover {
  background-color: rgb(255,0,0, 0.6);
}

.pokemon-details {
  text-align: center;
  background-color: rgb(153, 151, 151);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-details h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.pokemon-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.info p {
  font-size: 1.2em;
  margin: 0;
}

.info p span {
  font-weight: bold;
  color: #333;
}

.info .measures {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}

.stats {
  margin-top: 20px;
}

.stats h2 {
  font-size: 2em;
  margin-bottom: 10px;
}

.stats ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.stats li {
  font-size: 1.2em;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
}

.stat-name {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.stat-bar {
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
  height: 25px;
}

.stat-value {
  background-color: #4caf50;
  height: 100%;
  line-height: 25px;
  color: white;
  text-align: center;
  border-radius: 5px;
  transition: width 0.3s;
}

.loading {
  text-align: center;
  font-size: 1.5em;
  color: #777;
}
</style>
