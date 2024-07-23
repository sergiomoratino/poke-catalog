<template>
  <div class="filter-container">
    <div class="filter-group-row">
      <!-- Search bar component for filtering Pokémon by name -->
      <SearchBar @search="searchPokemon" />

      <div class="filter-type">
        <label for="type">Type:</label>
        <!-- Dropdown for selecting Pokémon type -->
        <select id="type" v-model="internalSelectedType">
          <option value="">All Types</option>
          <option v-for="type in uniqueTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
    </div>
    <div class="filter-group">
      <span>Weight</span>
      <!-- Input fields for minimum and maximum weight filters -->
      <input
        id="weight-min"
        type="number"
        v-model="internalMinWeight"
        placeholder="Min weight"
      />
      <input
        id="weight-max"
        type="number"
        v-model="internalMaxWeight"
        placeholder="Max weight"
      />
    </div>
    <div class="filter-group">
      <span>Height</span>
      <!-- Input fields for minimum and maximum height filters -->
      <input
        id="height-min"
        type="number"
        v-model="internalMinHeight"
        placeholder="Min height"
      />
      <input
        id="height-max"
        type="number"
        v-model="internalMaxHeight"
        placeholder="Max height"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import { FiltersType } from '../types';

const props = defineProps<{
  uniqueTypes: string[];
  modelValue: FiltersType;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: FiltersType): void;
}>();

// Internal state variables to manage filter values
const internalSelectedType = ref(props.modelValue.selectedType);
const internalMinWeight = ref(props.modelValue.minWeight);
const internalMaxWeight = ref(props.modelValue.maxWeight);
const internalMinHeight = ref(props.modelValue.minHeight);
const internalMaxHeight = ref(props.modelValue.maxHeight);
const internalName = ref(props.modelValue.name);

const searchPokemon = (term: string) => {
  internalName.value = term;
};

// Watch for changes in internal filter values and emit updated values to parent
watch(
  [
    internalSelectedType,
    internalMinWeight,
    internalMaxWeight,
    internalMinHeight,
    internalMaxHeight,
    internalName,
  ],
  ([
    newSelectedType,
    newMinWeight,
    newMaxWeight,
    newMinHeight,
    newMaxHeight,
    newName,
  ]) => {
    emits('update:modelValue', {
      selectedType: newSelectedType,
      minWeight: newMinWeight,
      maxWeight: newMaxWeight,
      minHeight: newMinHeight,
      maxHeight: newMaxHeight,
      name: newName,
    });
  },
  { immediate: true }
);
</script>

<style scoped>
.filter-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 60%;
  margin: auto;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  margin-bottom: 0.5rem;
}

.filter-group input,
.filter-group select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filter-group-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  margin: auto;
}

.filter-group-row > * {
  flex: 1;
}

.filter-type {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-type select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

@media (min-width: 600px) {
  .filter-container {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .filter-group {
    flex: 1 1 45%;
  }
}

@media (min-width: 1024px) {
  .filter-container {
    gap: 2rem;
  }

  .filter-group {
    flex: 1 1 30%;
  }
}
</style>
