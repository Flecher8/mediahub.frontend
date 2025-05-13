import { MediaContent } from "./mediaContent";
import { MovieInfo } from "./movieInfo";

export interface Film {
  filmId: string;
  mediaContent: MediaContent;
  movieInfo: MovieInfo;
}