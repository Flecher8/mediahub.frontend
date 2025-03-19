import { Media } from "./media";

export interface Collection {
  id: string;
  name: string;
  image: string;
  mediaItems: Media[];
}