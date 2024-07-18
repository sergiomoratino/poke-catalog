import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import PokemonDetailView from './pages/PokemonDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/pokemon/:id', component: PokemonDetailView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
