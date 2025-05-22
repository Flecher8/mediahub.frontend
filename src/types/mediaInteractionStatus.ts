import { ContentStatus } from "./contentStatus";
import { Evaluation } from "./evaluation";
import { MediaContent } from "./mediaContent";
import { RecommendationCollection } from "./recommendationCollection";

export interface MediaInteractionStatus {
	mediaInteractionStatusId: string;
	mediaContent: MediaContent;
	contentStatus: ContentStatus;
	recommendationCollection: RecommendationCollection;
	evaluation: Evaluation;
}
