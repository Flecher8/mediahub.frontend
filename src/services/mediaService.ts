import api from "@/lib/api";
import { MediaContent } from "@/types/mediaContent";
import { testMedia } from "./test/testMedia";

export class MediaService {
	/**
	 * Fetch a single MediaContent by its ID.
	 * @param mediaId  the ID of the media to retrieve
	 * @returns        a Promise resolving to the MediaContent
	 */
	static async getMediaById(mediaId: string): Promise<MediaContent | undefined> {
		// return testMedia.find(m => m.mediaContentId === mediaId);

		try {
			const response = await api.get<MediaContent>(`/api/MediaContents/${mediaId}`);
			return response.data;
		} catch (err: any) {
			console.error("Failed to fetch media by ID:", err);
			throw new Error(err?.response?.data?.message || err.message || "Unknown error fetching media");
		}
	}
}
