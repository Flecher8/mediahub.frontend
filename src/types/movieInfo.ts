import { Actor } from "./actor";
import { Director } from "./director";

export interface MovieInfo {
  movieInfoId: string;
  durationInMinutes: number;
  directors: Director[];
  actors: Actor[];
}