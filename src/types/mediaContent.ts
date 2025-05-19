import { Genre } from "./genre";
import { MediaContentType } from "./mediaContentType";
import { PictureLink } from "./pictureLink";

export interface MediaContent {
  mediaContentId: string;
  title: string;
  mainPictureLink: string | null;
  description: string;
  rating: number;
  releaseDate: Date;
  genres: Genre[];
  mediaContentType: MediaContentType;
  pictureLinks: PictureLink[];
}