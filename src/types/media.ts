import { Genre } from "./genre";

export interface Media {
  id: string;
  name: string;
  image: string;
  type: string;
  genres: Genre[];
}