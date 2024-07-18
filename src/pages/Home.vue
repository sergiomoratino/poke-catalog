<template>
  <div>
    <SearchBar @search="searchPokemon" />
    <select v-model="selectedType" @change="filterByType">
      <option value="">All Types</option>
      <option v-for="type in uniqueTypes" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
    <PokemonList :pokemons="filteredPokemons" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePokemonStore } from '../store/pokemon';
import SearchBar from '../components/SearchBar.vue';
import PokemonList from '../components/PokemonList.vue';

const store = usePokemonStore();
const searchTerm = ref('');
const selectedType = ref('');

const uniqueTypes = computed(() => {
  const types = store.pokemons.flatMap((pokemon) =>
    pokemon.types.map((type) => type.type.name)
  );
  return [...new Set(types)];
});

const filteredPokemons = computed(() => {
  return store.pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const matchesType = selectedType.value
      ? pokemon.types.some((type) => type.type.name === selectedType.value)
      : true;
    return matchesSearch && matchesType;
  });
});

const searchPokemon = (term) => {
  searchTerm.value = term;
};

const filterByType = () => {
  // Triggered when the selected type changes
};

onMounted(async() => {
  await store.fetchPokemonsData();
  console.log('Pokemons fetched', store.pokemons);
});
</script>
