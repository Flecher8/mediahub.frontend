import api from "@/lib/api";
import { MediaContent } from "@/types/mediaContent";
import { testMedia } from "@/services/test/testMedia";

export class RecommendationService {
	/** Fetch a single page of recommendations */
	static async getRecommendations(collectionId: string | null, page: number): Promise<MediaContent[]> {
		try {
			const url =
				collectionId === null
					? `/api/Recommendations/guest?page=${page}`
					: `/api/Recommendations/${collectionId}?page=${page}`;
			const { data } = await api.get<MediaContent[]>(url);
			return data;
		} catch (err: any) {
			console.error("Failed to fetch recommendations:", err);
			throw new Error(err?.response?.data?.message || err.message || "Unknown error");
		}
	}

	/** Fetch how many pages of recommendations exist */
	static async getTotalPages(collectionId: string | null): Promise<number> {
		try {
			const url =
				collectionId === null ? `/api/Recommendations/guest/pages` : `/api/Recommendations/${collectionId}/pages`;
			const { data } = await api.get<{ totalPages: number }>(url);
			return data.totalPages;
		} catch (err: any) {
			console.error("Failed to fetch recommendation page count:", err);
			throw new Error(err?.response?.data?.message || err.message || "Unknown error");
		}
	}
}
