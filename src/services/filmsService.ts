import api from "@/lib/api";
import { Film } from "@/types/film";
import { getFakeFilmByMediaId } from "./test/testFilm";

export class FilmsService {
	/**
	 * Fetch a Film by its associated MediaContent ID.
	 * @param mediaId  the ID of the MediaContent
	 * @returns        a Promise resolving to the Film object
	 */
	static async getFilmByMediaId(mediaId: string): Promise<Film> {
		// return getFakeFilmByMediaId(mediaId);

		try {
			const response = await api.get<Film>(`/api/Films/by-media/${mediaId}`);
			return response.data;
		} catch (err: any) {
			console.error("Failed to fetch film by mediaId:", err);
			throw new Error(err?.response?.data?.message || err.message || "Unknown error fetching film");
		}
	}
}
