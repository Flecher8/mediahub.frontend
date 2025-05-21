import { CollectionUserRole } from "./collectionUserRole";
import { RecommendationCollection } from "./recommendationCollection";
import { User } from "./user";

export interface RecommendationCollectionUserAccess {
	userAccessId: string;
	user: User;
	collection: RecommendationCollection;
	// image: string;
	role: CollectionUserRole;
}
