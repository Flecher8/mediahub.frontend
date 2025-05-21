import { RecommendationCollectionUserAccess } from "./recommendationCollectionUserAccess";
import { MediaContent } from "./mediaContent";
import { User } from "./user";

export interface RecommendationCollection {
	collectionId: string;
	name: string;
	creator: User;
	// image: string;
	// mediaItems: MediaContent[];
	recommendationCollectionUserAccesses: RecommendationCollectionUserAccess[];
}
