import { MangaAuthor } from "./mangaAuthor";
import { MediaContent } from "./mediaContent";

export interface Manga {
  mangaId: string;
  rank: number;
  startDate: Date;
  endDate: Date;
  numberOfVolumes: number;
  numberOfChapters: number;
  mediaContent: MediaContent;
  authors: MangaAuthor[];
}