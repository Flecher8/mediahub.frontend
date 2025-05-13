import api from "@/lib/api";
import { MediaContent } from "@/types/mediaContent";
import { testMedia } from "@/services/test/testMedia";


export class RecommendationService {
  /**
   * Fetches recommended media for a given user.
   * If userId is null or undefined, returns global recommendations.
   */
  static async getRecommendations(userId: string | null): Promise<MediaContent[]> {
    return testMedia;

    /* try {
      const response = await api.get<MediaContent[]>("/recommendations", {
        params: userId ? { userId } : {},
      });
      return response.data;
    } catch (err: any) {
      // You can inspect err.response?.data for a message from your backend
      console.error("Failed to fetch recommendations:", err);
      throw new Error(err?.response?.data?.message || err.message || "Unknown error");
    } */
  }
}
