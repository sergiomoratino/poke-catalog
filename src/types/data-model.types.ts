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
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export interface PokemonCache {
  [key: string]: Pokemon;
}


export interface FiltersType {
  selectedType: string;
  minWeight: string;
  maxWeight: string;
  minHeight: string;
  maxHeight: string;
  name: string;
}