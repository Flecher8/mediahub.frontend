import { RecommendationCollectionUserAccess } from "./recommendationCollectionUserAccess";
import { MediaContent } from "./mediaContent";

export interface RecommendationCollection {
  collectionId: string;
  name: string;
  // image: string;
  mediaItems: MediaContent[];
  recommendationCollectionUserAccess: RecommendationCollectionUserAccess[];
}