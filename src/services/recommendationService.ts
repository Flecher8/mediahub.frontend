import api from "@/lib/api";
import { MediaContent } from "@/types/mediaContent";
import { testMedia } from "@/services/test/testMedia";

export class RecommendationService {
	/**
	 * Fetches recommended media for a given collection.
	 * If collectionId is null or undefined, returns global recommendations.
	 */
	static async getRecommendations(collectionId: string | null): Promise<MediaContent[]> {
		return testMedia;

		/* if (collectionId === null) {
			collectionId = "0";
		}
		try {
			const response = await api.get<MediaContent[]>(`/recommendations/${collectionId}`);
			return response.data;
		} catch (err: any) {
			// You can inspect err.response?.data for a message from your backend
			console.error("Failed to fetch recommendations:", err);
			throw new Error(err?.response?.data?.message || err.message || "Unknown error");
		} */
	}
}
