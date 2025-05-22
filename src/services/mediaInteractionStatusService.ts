import api from "@/lib/api";
import { MediaInteractionStatus } from "@/types/mediaInteractionStatus";

export class MediaInteractionStatusService {
	static async getStatus(collectionId: string, mediaContentId: string): Promise<MediaInteractionStatus | null> {
		try {
			const response = await api.get<MediaInteractionStatus>(
				`/api/MediaInteractionStatuses/collection/${collectionId}/media/${mediaContentId}`
			);
			return response.data;
		} catch (err: any) {
			if (err.response?.status === 404) return null;
			console.error("Failed to fetch media interaction status:", err);
			throw new Error(
				err?.response?.data?.message || err.message || "Unknown error fetching media interaction status"
			);
		}
	}

	static async add(collectionId: string, mediaContentId: string): Promise<MediaInteractionStatus> {
		try {
			const response = await api.post<MediaInteractionStatus>(`/api/MediaInteractionStatuses/`, {
				mediaContentId: mediaContentId,
				recommendationCollectionId: collectionId
			});
			return response.data;
		} catch (err: any) {
			console.error("Failed to add media interaction status:", err);
			throw new Error(
				err?.response?.data?.message || err.message || "Unknown error creating media interaction status"
			);
		}
	}

	static async update(
		interactionId: string,
		evaluationId: string,
		contentStatusId: string
	): Promise<MediaInteractionStatus> {
		try {
			const response = await api.put<MediaInteractionStatus>(`/api/MediaInteractionStatuses/${interactionId}`, {
				mediaInteractionStatusId: interactionId,
				evaluationId: evaluationId,
				contentStatusId: contentStatusId
			});
			return response.data;
		} catch (err: any) {
			console.error("Failed to update media interaction status:", err);
			throw new Error(
				err?.response?.data?.message || err.message || "Unknown error updating media interaction status"
			);
		}
	}

	static async remove(collectionId: string, mediaContentId: string): Promise<void> {
		try {
			await api.delete(`/api/MediaInteractionStatuses/collection/${collectionId}/media/${mediaContentId}`);
		} catch (err: any) {
			console.error("Failed to remove media interaction status:", err);
			throw new Error(
				err?.response?.data?.message || err.message || "Unknown error removing media interaction status"
			);
		}
	}
}
