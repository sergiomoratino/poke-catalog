<template>
  <div>
    <SearchBar @search="searchPokemon" />
    <div>
      <label for="type">Type:</label>
      <select id="type" v-model="selectedType">
        <option value="">All Types</option>
        <option v-for="type in uniqueTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>
    <div>
      <label for="weight-min">Weight (min):</label>
      <input
        id="weight-min"
        type="number"
        v-model="minWeight"
        placeholder="Min weight"
      />

      <label for="weight-max">Weight (max):</label>
      <input
        id="weight-max"
        type="number"
        v-model="maxWeight"
        placeholder="Max weight"
      />
    </div>
    <div>
      <label for="height-min">Height (min):</label>
      <input
        id="height-min"
        type="number"
        v-model="minHeight"
        placeholder="Min height"
      />

      <label for="height-max">Height (max):</label>
      <input
        id="height-max"
        type="number"
        v-model="maxHeight"
        placeholder="Max height"
      />
    </div>
    <PokemonList :pokemons="filteredPokemons" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePokemonStore } from '../store/pokemon';
import SearchBar from '../components/SearchBar.vue';
import PokemonList from '../components/PokemonList.vue';
import { Pokemon } from '../types';

const store = usePokemonStore();
const searchTerm = ref<string>('');
const selectedType = ref<string>('');
const minWeight = ref<string>('');
const maxWeight = ref<string>('');
const minHeight = ref<string>('');
const maxHeight = ref<string>('');

const uniqueTypes = computed(() => {
  const types = store.pokemons.flatMap((pokemon: Pokemon) =>
    pokemon.types.map((type) => type.type.name)
  );
  return [...new Set(types)];
});

const filteredPokemons = computed(() => {
  return store.pokemons.filter((pokemon: Pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());

    const matchesType = selectedType.value
      ? pokemon.types.some((type) => type.type.name === selectedType.value)
      : true;

    const matchesWeight =
      (minWeight.value === '' ||
        pokemon.weight >= parseFloat(minWeight.value)) &&
      (maxWeight.value === '' || pokemon.weight <= parseFloat(maxWeight.value));

    const matchesHeight =
      (minHeight.value === '' ||
        pokemon.height >= parseFloat(minHeight.value)) &&
      (maxHeight.value === '' || pokemon.height <= parseFloat(maxHeight.value));

    return matchesSearch && matchesType && matchesWeight && matchesHeight;
  });
});

const searchPokemon = (term: string) => {
  searchTerm.value = term;
};

onMounted(async () => {
  await store.fetchPokemonsData();
  console.log('Pokemons fetched', store.pokemons);
});
</script>
