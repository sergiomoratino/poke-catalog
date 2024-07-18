<template>
  <input type="text" placeholder="Search for a Pokémon..." @input="onInput" />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps();
const emit = defineEmits();

const onInput = (event: InputEvent) => {
  emit('search', (event.target as HTMLInputElement).value);
};
</script>
