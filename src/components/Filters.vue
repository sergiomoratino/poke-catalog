<template>
  <div>
    <div>
      <label for="type">Type:</label>
      <select id="type" v-model="internalSelectedType">
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
        v-model="internalMinWeight"
        placeholder="Min weight"
      />

      <label for="weight-max">Weight (max):</label>
      <input
        id="weight-max"
        type="number"
        v-model="internalMaxWeight"
        placeholder="Max weight"
      />
    </div>
    <div>
      <label for="height-min">Height (min):</label>
      <input
        id="height-min"
        type="number"
        v-model="internalMinHeight"
        placeholder="Min height"
      />

      <label for="height-max">Height (max):</label>
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
import { defineProps, defineEmits, ref, watch } from 'vue';

interface Filters {
  selectedType: string;
  minWeight: string;
  maxWeight: string;
  minHeight: string;
  maxHeight: string;
}

const props = defineProps<{
  uniqueTypes: string[];
  modelValue: Filters;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: Filters): void;
}>();

const internalSelectedType = ref(props.modelValue.selectedType);
const internalMinWeight = ref(props.modelValue.minWeight);
const internalMaxWeight = ref(props.modelValue.maxWeight);
const internalMinHeight = ref(props.modelValue.minHeight);
const internalMaxHeight = ref(props.modelValue.maxHeight);

watch(
  [
    internalSelectedType,
    internalMinWeight,
    internalMaxWeight,
    internalMinHeight,
    internalMaxHeight,
  ],
  ([
    newSelectedType,
    newMinWeight,
    newMaxWeight,
    newMinHeight,
    newMaxHeight,
  ]) => {
    emits('update:modelValue', {
      selectedType: newSelectedType,
      minWeight: newMinWeight,
      maxWeight: newMaxWeight,
      minHeight: newMinHeight,
      maxHeight: newMaxHeight,
    });
  }
);
</script>
