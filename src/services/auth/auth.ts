export interface UserData {
	id: string;
	email: string;
}

const STORAGE_KEY = "auth:user";

export class AuthStore {
	/** Save user data to localStorage */
	static setUserData(user: UserData) {
		if (typeof window === "undefined") return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
	}

	/** Clear user data (logout) */
	static clear() {
		if (typeof window === "undefined") return;
		localStorage.removeItem(STORAGE_KEY);
	}

	/** Returns stored user data or null */
	static getUserData(): UserData | null {
		if (typeof window === "undefined") return null;
		const json = localStorage.getItem(STORAGE_KEY);
		if (!json) return null;
		try {
			return JSON.parse(json) as UserData;
		} catch {
			return null;
		}
	}

	/** Is there a logged-in user? */
	static isAuthorized(): boolean {
		if (typeof window === "undefined") return false;
		return localStorage.getItem(STORAGE_KEY) !== null;
		// return Boolean(this.getUserData());
	}
}

/* export const testUser: UserData = {
  id: "5BE9D7E8-D18B-4526-8547-08DD5B1DDFEE",
  email: "test@gmail.com",
};
 */

/* export const authStorage = {
  // Returns the user data stored in localStorage
  getUserData(): UserData {
    return testUser;
  },

  // Determines if the user is authorized based on stored data
  isAuthorized(): boolean {
    return Boolean(true);
  },

  // Save user data (id and email) in localStorage
  // setUserData(userData: UserData): void {
  //   if (typeof window === "undefined") return;
  //   if (userData.id) {
  //     localStorage.setItem("userId", userData.id);
  //   }
  //   if (userData.email) {
  //     localStorage.setItem("userEmail", userData.email);
  //   }
  // },

  // Remove the user data from localStorage
  logout(): void {

  },
}; */
