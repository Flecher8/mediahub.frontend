// src/services/collectionsService.ts
import api from "@/lib/api";
import { RecommendationCollection } from "@/types/recommendationCollection";
import { MediaContent } from "@/types/mediaContent";
import { User } from "@/types/user";
import { testCollection } from "@/services/test/testCollection";

export class CollectionsService {
	/**
	 *  Add a media item to a collection.
	 */
	static async addMediaToCollection(collectionId: string, mediaId: string): Promise<void> {
		try {
			await api.post(`/collections/${collectionId}/addMedia/${mediaId}`);
		} catch (err: any) {
			console.error("Failed to add media to collection:", err);
			throw new Error(err?.response?.data?.message || err.message || "Error adding media");
		}
	}

	/**
	 *  Create collection for user.
	 */
	static async createCollection(userId: string, name: string): Promise<void> {
		try {
			await api.post(`/collections/create/userId/${userId}/name/${name}`);
		} catch (err: any) {
			console.error("Failed to create user collection:", err);
			throw new Error(err?.response?.data?.message || err.message || "Error creating collection");
		}
	}

	/**
	 *  Get collection by id.
	 */
	static async getCollectionById(collectionId: string): Promise<RecommendationCollection | undefined> {
		const collection = testCollection.find(c => c.collectionId === collectionId);
		return collection;

		/* try {
			await api.post(`/collections/${collectionId}`);
		} catch (err: any) {
			console.error("Failed to get collection:", err);
			throw new Error(err?.response?.data?.message || err.message || "Error getting collection");
		} */
	}

	/**
	 *  Fetch all collections belonging to a user.
	 */
	static async getUserCollections(userId: string): Promise<RecommendationCollection[]> {
		return testCollection;

		/* try {
			const { data } = await api.get<RecommendationCollection[]>(`/collections/collectionsByUser/${userId}`);
			return data;
		} catch (err: any) {
			console.error("Failed to fetch user collections:", err);
			throw new Error(err?.response?.data?.message || err.message || "Error fetching collections");
		} */
	}

	/**
	 *  Get all media items in a collection.
	 */
	static async getMediaInCollection(collectionId: string): Promise<MediaContent[]> {
		const collection = testCollection.find(c => c.collectionId === collectionId);
		return collection !== undefined ? collection.mediaItems : [];

		/* try {
			const { data } = await api.get<MediaContent[]>(`/collections/${collectionId}/mediaList`);
			return data;
		} catch (err: any) {
			console.error("Failed to fetch media in collection:", err);
			throw new Error(err?.response?.data?.message || err.message || "Error fetching collection media");
		} */
	}

	/**
	 *  Remove a media item from a collection.
	 */
	static async removeMediaFromCollection(collectionId: string, mediaId: string): Promise<void> {
		try {
			await api.delete(`/collections/${collectionId}/media/${mediaId}`);
		} catch (err: any) {
			console.error("Failed to remove media from collection:", err);
			throw new Error(err?.response?.data?.message || err.message || "Error removing media");
		}
	}

	/**
	 *  Add a user to a collection by their email.
	 */
	static async addUserToCollection(collectionId: string, userEmail: string): Promise<void> {
		try {
			await api.post(`/collections/${collectionId}/users`, { email: userEmail });
		} catch (err: any) {
			console.error("Failed to add user to collection:", err);
			throw new Error(err?.response?.data?.message || err.message || "Error adding user");
		}
	}

	/**
	 *  Remove a user from a collection by their userId.
	 */
	static async removeUserFromCollection(collectionId: string, userId: string): Promise<void> {
		try {
			await api.delete(`/collections/${collectionId}/users/${userId}`);
		} catch (err: any) {
			console.error("Failed to remove user from collection:", err);
			throw new Error(err?.response?.data?.message || err.message || "Error removing user");
		}
	}

	/**
	 *  Get all users who have access to a collection.
	 */
	static async getUsersInCollection(collectionId: string): Promise<User[]> {
		return [
			{ id: "1", email: "example1@gmail.com" },
			{ id: "2", email: "example2@gmail.com" }
		];

		/* try {
			const { data } = await api.get<User[]>(`/collections/${collectionId}/users`);
			return data;
		} catch (err: any) {
			console.error("Failed to fetch users in collection:", err);
			throw new Error(err?.response?.data?.message || err.message || "Error fetching users");
		} */
	}

	/**
	 *  Delete an entire collection.
	 */
	static async deleteCollection(collectionId: string): Promise<void> {
		try {
			await api.delete(`/collections/${collectionId}`);
		} catch (err: any) {
			console.error("Failed to delete collection:", err);
			throw new Error(err?.response?.data?.message || err.message || "Error deleting collection");
		}
	}
}
