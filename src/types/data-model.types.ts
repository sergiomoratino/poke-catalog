export interface Pokemon {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  weight: number;
  height: number;
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonCache {
  [key: string]: Pokemon;
}
