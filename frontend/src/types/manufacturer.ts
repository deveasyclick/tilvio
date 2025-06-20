export interface Manufacturer {
  ID: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  location: string;
  logo: string;
  url: string;
}
