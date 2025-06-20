import type { Manufacturer } from './manufacturer';

export interface Tile {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  manufacturer_id: number;
  manufacturer?: Manufacturer;
  code: string;
  description: string;
  dimension: string;
  type: string;
  imageUrl: string;
  weightInKg: number;
}

export type TileResponse = {
  tiles: Tile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TileDimension =
  | '250X400'
  | '250X500'
  | '250X600'
  | '300X300'
  | '400X400'
  | '600X600'
  | undefined;

export type TileType = 'wall' | 'floor' | undefined;

export type TileManufacturer =
  | 'goodwill'
  | 'goldencrown'
  | 'royalcastle'
  | 'vironyl'
  | undefined;

export interface TileFilters {
  search: string;
  dimension: TileDimension;
  manufacturer: TileManufacturer;
  type: TileType;
}
