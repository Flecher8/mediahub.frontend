import { MediaContent } from "./mediaContent";
import { MovieInfo } from "./movieInfo";

export interface Serial {
  serialId: string;
  mediaContent: MediaContent;
  movieInfo: MovieInfo;
  numberOfSeasons: number;
  numberOfEpisodes: number;
}