import api from "@/lib/api";
import { Game } from "@/types/game";
import { getFakeGameByMediaId } from "./test/testGame";

export class GamesService {
	/**
	 * Fetch a Game by its associated MediaContent ID.
	 * @param mediaId  the ID of the MediaContent
	 * @returns        a Promise resolving to the Game object
	 */
	static async getGameByMediaId(mediaId: string): Promise<Game> {
    return getFakeGameByMediaId(mediaId);
    
		/* try {
			const response = await api.get<Game>(`/games/${mediaId}`);
			return response.data;
		} catch (err: any) {
			console.error("Failed to fetch game by mediaId:", err);
			throw new Error(err?.response?.data?.message || err.message || "Unknown error fetching game");
		} */
	}
}
