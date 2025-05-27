import api from "@/lib/api";
import { MediaContent } from "@/types/mediaContent";

export class SearchService {
	/**
	 * Search media contents by title.
	 * @param query partial title (at least 5 chars)
	 */
	static async searchMedia(query: string): Promise<MediaContent[]> {
		try {
			const { data } = await api.get<MediaContent[]>(`/api/MediaContents/search`, { params: { query } });
			return data;
		} catch (err: any) {
			console.error("Search failed:", err);
			throw new Error(err?.response?.data?.message || err.message || "Search error");
		}
	}
}
