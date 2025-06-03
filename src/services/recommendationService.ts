import api, { slowApi } from "@/lib/api";
import { MediaContent } from "@/types/mediaContent";
import { testMedia } from "@/services/test/testMedia";

export class RecommendationService {
	/** Fetch a single page of recommendations, retrying up to 60 s on timeout */
	static async getRecommendations(collectionId: string | null, page: number): Promise<MediaContent[]> {
		const start = Date.now();

		// build the URL once
		const url =
			collectionId === null
				? `/api/Recommendations/guest?page=${page}`
				: `/api/Recommendations/${collectionId}?page=${page}`;

		while (true) {
			try {
				// Attempt the request (Axios’s default timeout is 60 s)
				const { data } = await slowApi.get<MediaContent[]>(url);
				return data;
			} catch (err: any) {
				// Log the error for diagnostics:
				// console.error("Recommendation fetch failed, will retry in 60 s:", err);

				// Wait exactly 60 000 ms before trying again
				await new Promise(resolve => setTimeout(resolve, 1_000));
				// Then loop back and retry
			}
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
