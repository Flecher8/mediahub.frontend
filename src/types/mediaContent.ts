import { Genre } from "./genre";
import { MediaContentType } from "./mediaContentType";

export interface MediaContent {
  mediaContentId: string;
  title: string;
  mainPictureLink: string;
  description: string;
  rating: number;
  releaseDate: Date;
  genres: Genre[];
  mediaContentType: MediaContentType;
}