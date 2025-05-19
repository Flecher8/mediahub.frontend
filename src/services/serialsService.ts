import api from "@/lib/api";
import { Serial } from "@/types/serial";
import { getFakeSerialByMediaId } from "./test/testSerial";

export class SerialsService {
	/**
	 * Fetch a Serial by its associated MediaContent ID.
	 * @param mediaId  the ID of the MediaContent
	 * @returns        a Promise resolving to the Serial object
	 */
	static async getSerialByMediaId(mediaId: string): Promise<Serial> {
		// return getFakeSerialByMediaId(mediaId);

		try {
      const response = await api.get<Serial>(`/api/Serials/by-media/${mediaId}`);
      return response.data;
    } catch (err: any) {
      console.error("Failed to fetch serial by mediaId:", err);
      throw new Error(err?.response?.data?.message || err.message || "Unknown error fetching serial");
    }
	}
}
