# Vue 3 Pokémon Catalog

## Description

This project is a responsive web application (mobile first) that displays a catalog of Pokémon using the PokeAPI. Users can:

1. View a catalog of Pokémon.
2. Filter Pokémon by common properties (type, weight, height).
3. Filter Pokémon by free text.
4. Access details for each Pokémon.
5. Directly access a Pokémon via URL.

## Features

- **Responsive Design**: The application is designed to work seamlessly on both mobile and desktop devices.
- **Filtering**: Users can filter Pokémon by type, weight, height, and name.
- **Detail View**: Detailed information for each Pokémon, including types, weight, and height.
- **Direct URL Access**: Navigate directly to a Pokémon's details using a URL.

## Technologies Used

- **Vue 3**: The progressive JavaScript framework.
- **Pinia**: State management library for Vue.
- **Vitest**: A blazing fast unit test framework powered by Vite.
- **PokeAPI**: The RESTful Pokémon API.

## Project Setup

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/vue3-pokemon-catalog.git
   cd vue3-pokemon-catalog

2. **Install dependencies**
    ```sh
    npm install


### Running the Development Server
*
    ```sh
    npm run dev

### Running Tests
*
    ```sh
    npm run test


### Project Structure
src/
├── components/        # Vue components
│   ├── SearchBar.vue  # Component for searching Pokémon by name
│   ├── PokemonList.vue # Component for displaying the list of Pokémon
│   |── PokemonCard.vue # Component for displaying a Pokémon card
|   |── Filters.vue    # Component for filtering Pokémon by type, weight, and height
|   └── Loader.vue     # Component for displaying a loading spinner
├── store/             # Pinia store
│   └── pokemon.ts     # Store module for Pokémon data
├── pages/             # Vue pages
│   |── Home.vue       # Home view displaying the Pokémon catalog
|   └── PokemonDetail.vue # View displaying detailed information for a Pokémon
├── App.vue            # Root component
├── main.ts            # Main entry point
tests/
├── components/        # Unit tests for components
│   └── SearchBar.test.ts
vite.config.ts         # Vite configuration
vitest.config.ts       # Vitest config file
