import api from "@/lib/api";
import { Manga } from "@/types/manga";
import { getFakeMangaByMediaId } from "./test/testManga"; 

export class MangasService {
  /**
   * Fetch a Manga by its associated MediaContent ID.
   * @param mediaId  the ID of the MediaContent
   * @returns        a Promise resolving to the Manga object
   */
  static async getMangaByMediaId(mediaId: string): Promise<Manga> {
    // return getFakeMangaByMediaId(mediaId);
    
    try {
      const response = await api.get<Manga>(`/api/Manga/by-media/${mediaId}`);
      return response.data;
    } catch (err: any) {
      console.error("Failed to fetch manga by mediaId:", err);
      throw new Error(err?.response?.data?.message || err.message || "Unknown error fetching manga");
    }
  }
}
