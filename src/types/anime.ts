import { AnimeStudio } from "./animeStudio";
import { MediaContent } from "./mediaContent";

export interface Anime {
  animeId: string;
  rank: number;
  numberOfEpisodes: number;
  startDate: Date;
  endDate: Date;
  mediaContent: MediaContent;
  animeStudios: AnimeStudio[];
}