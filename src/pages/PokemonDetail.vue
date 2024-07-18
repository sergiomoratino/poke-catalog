<template>
  <div v-if="pokemon">
    <h1>{{ pokemon.name }}</h1>
    <img :src="pokemon.sprites.front_default" alt="pokemon image" />
    <p>Height: {{ pokemon.height }}</p>
    <p>Weight: {{ pokemon.weight }}</p>
    <p>Types: {{ pokemon.types.map((type) => type.type.name).join(', ') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { usePokemonStore } from '../store/pokemon';
import { onMounted, ref, Ref } from 'vue';
import { Pokemon } from '../types';

const store = usePokemonStore();
const route = useRoute();
const pokemonId: string = route.params.id as string;
const pokemon: Ref<Pokemon | null> = ref(null);

const loadPokemon = async () => {
  pokemon.value = await store.fetchPokemon(pokemonId);
};

onMounted(() => {
  loadPokemon();
});
</script>
