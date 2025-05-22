import api from "@/lib/api";
import { ContentStatus } from "@/types/contentStatus";

export class ContentStatusService {
	static async getAll(): Promise<ContentStatus[]> {
		try {
			const response = await api.get<ContentStatus[]>("/api/ContentStatuses");
			return response.data;
		} catch (err: any) {
			console.error("Failed to fetch content statuses:", err);
			throw new Error(err?.response?.data?.message || err.message || "Unknown error fetching content statuses");
		}
	}
}
