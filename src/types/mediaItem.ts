import { Genre } from "./genre";

export interface MediaItem {
  id: string;
  name: string;
  image: string;
  genres: Genre[];
}