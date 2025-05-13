export interface SelectedCollection {
	id: string;
	name: string;
}

const STORAGE_KEY = "selectedCollection";

export class SelectedCollectionService {
	/** Read the current collection from localStorage (or null). */
	static get(): SelectedCollection | null {
		if (typeof window === "undefined") return null;
		const json = localStorage.getItem(STORAGE_KEY);
		if (!json) return null;
		try {
			return JSON.parse(json) as SelectedCollection;
		} catch {
			return null;
		}
	}

	/** Persist the given collection to localStorage. */
	static set(col: SelectedCollection): void {
		if (typeof window === "undefined") return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(col));
	}
}
