<template>
  <div>
    <SearchBar @search="searchPokemon" />
    <Filters :uniqueTypes="uniqueTypes" v-model="filters" />
    <PokemonList :pokemons="filteredPokemons" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePokemonStore } from '../store/pokemon';
import SearchBar from '../components/SearchBar.vue';
import PokemonList from '../components/PokemonList.vue';
import Filters from '../components/Filters.vue';
import { Pokemon, FiltersType } from '../types';

const store = usePokemonStore();
const searchTerm = ref<string>('');

const filters = ref<FiltersType>({
  selectedType: '',
  minWeight: '',
  maxWeight: '',
  minHeight: '',
  maxHeight: '',
});

const uniqueTypes = computed<string[]>(() => {
  const types = store.pokemons.flatMap((pokemon: Pokemon) =>
    pokemon.types.map((type) => type.type.name)
  );
  return [...new Set(types)];
});

const filteredPokemons = computed<Pokemon[]>(() => {
  return store.pokemons.filter((pokemon: Pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());

    const matchesType = filters.value.selectedType
      ? pokemon.types.some(
          (type) => type.type.name === filters.value.selectedType
        )
      : true;

    const matchesWeight =
      (filters.value.minWeight === '' ||
        pokemon.weight >= parseFloat(filters.value.minWeight)) &&
      (filters.value.maxWeight === '' ||
        pokemon.weight <= parseFloat(filters.value.maxWeight));

    const matchesHeight =
      (filters.value.minHeight === '' ||
        pokemon.height >= parseFloat(filters.value.minHeight)) &&
      (filters.value.maxHeight === '' ||
        pokemon.height <= parseFloat(filters.value.maxHeight));

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
