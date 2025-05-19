import api from "@/lib/api";
import { Anime } from "@/types/anime";
import { getFakeAnimeByMediaId } from "./test/testAnime";

export class AnimesService {
  /**
   * Fetch a Anime by its associated MediaContent ID.
   * @param mediaId  the ID of the MediaContent
   * @returns        a Promise resolving to the Anime object
   */
  static async getAnimeByMediaId(mediaId: string): Promise<Anime> {
    // return getFakeAnimeByMediaId(mediaId);
    
    try {
      const response = await api.get<Anime>(`/api/Anime/by-media/${mediaId}`);
      return response.data;
    } catch (err: any) {
      console.error("Failed to fetch anime by mediaId:", err);
      throw new Error(err?.response?.data?.message || err.message || "Unknown error fetching anime");
    }
  }
}
