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
		return testMedia.find(m => m.mediaContentId === mediaId);

		/* try {
      const response = await api.get<MediaContent>(`/media/${mediaId}`);
      return response.data;
    } catch (err: any) {
      console.error("Failed to fetch media by ID:", err);
      throw new Error(
        err?.response?.data?.message ||
        err.message ||
        "Unknown error fetching media"
      );
    } */
	}

	/**
	 * Get the current user's score for a given media.
	 * Returns the numeric value or null if none set.
	 */
	static async getMediaScore(collectionId: string, mediaId: string): Promise<number | undefined> {
		// TESTING STUB: always null
		return undefined;

		// REAL API CALL (uncomment when backend endpoint exists)

		/* try {
			const { data } = await api.get<{ value: number }>(`/media/${mediaId}/score/${userId}`);
			return data.value;
		} catch (err: any) {
			if (err.response?.status === 404) {
				// no score set
				return null;
			}
			console.error("Failed to fetch media score:", err);
			throw new Error(err?.response?.data?.message || err.message || "Unknown error fetching score");
		} */
	}

	/**
	 * Set (or update) the collectionId's score for a given media.
	 * @param collectionId  ID of the collectionId setting the score
	 * @param mediaId ID of the media to score
	 * @param value   Score value (e.g. 1-10)
	 */
	static async setMediaScore(collectionId: string, mediaId: string, value: number): Promise<void> {
		// TESTING STUB: no-op
		console.log(`(stub) set score ${value?.toString()} for media ${mediaId} by user ${collectionId}`);
		return;

    // ! value can be 0, then delete evaluation for media for user

		// REAL API CALL (uncomment when backend endpoint exists)

    /* try {
      await api.post(`/media/${mediaId}/score`, {
        userId,
        value,
      });
    } catch (err: any) {
      console.error("Failed to set media score:", err);
      throw new Error(
        err?.response?.data?.message ||
        err.message ||
        "Unknown error setting score"
      );
    } */
	}
}
