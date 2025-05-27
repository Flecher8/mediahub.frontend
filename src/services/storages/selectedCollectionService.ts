import { AuthStore } from "@/services/auth/auth";
import { CollectionsService } from "@/services/collectionsService";

export interface SelectedCollection {
	id: string;
	name: string;
}

const STORAGE_KEY = "selectedCollection";

export class SelectedCollectionService {
	/**
	 * Read the current collection from localStorage if present.
	 * Otherwise, fetch the user’s collections,
	 * pick the first one (if any), save it, and return it.
	 * Returns null only if there is no logged-in user or
	 * the user has zero collections.
	 */
	static async get(): Promise<SelectedCollection | null> {
		if (typeof window === "undefined") return null;

		// Try localStorage
		const json = localStorage.getItem(STORAGE_KEY);
		if (json) {
			try {
				return JSON.parse(json) as SelectedCollection;
			} catch {
				// invalid JSON? fall through to re-fetch
			}
		}

		// Nothing in storage, fetch from API
		const user = AuthStore.getUserData();
		if (!user) return null;

		let cols;
		try {
			cols = await CollectionsService.getUserCollections(user.id);
		} catch {
			return null;
		}

		if (!cols.length) {
			return null;
		}

		// Take first, persist, return
		const first = cols[0];
		const sel: SelectedCollection = { id: first.collectionId, name: first.name };
		localStorage.setItem(STORAGE_KEY, JSON.stringify(sel));
		return sel;
	}

	/** Persist the given collection to localStorage. */
	static set(col: SelectedCollection): void {
		if (typeof window === "undefined") return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(col));
	}
}
