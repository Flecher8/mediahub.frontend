import { RecommendationCollection } from "./recommendationCollection";
import { User } from "./user";

export interface RecommendationCollectionUserAccess {
  userAccessId: string;
  user: User;
  collection: RecommendationCollection;
  // image: string;
  userCollectionRoleId: string[];
}