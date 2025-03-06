export interface UserData {
  id: string;
  email: string;
}

export const testUser: UserData = {
  id: "5BE9D7E8-D18B-4526-8547-08DD5B1DDFEE",
  email: "test@gmail.com",
};

export const authStorage = {
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
};
/* export const authStorage = {
  // Returns the user data stored in localStorage
  getUserData(): UserData {
    if (typeof window === "undefined") {
      return { id: null, email: null };
    }
    const id = localStorage.getItem("userId");
    const email = localStorage.getItem("userEmail");
    return { id, email };
  },

  // Determines if the user is authorized based on stored data
  isAuthorized(): boolean {
    if (typeof window === "undefined") return false;
    const { id, email } = this.getUserData();
    return Boolean(id && email);
  },

  // Save user data (id and email) in localStorage
  setUserData(userData: UserData): void {
    if (typeof window === "undefined") return;
    if (userData.id) {
      localStorage.setItem("userId", userData.id);
    }
    if (userData.email) {
      localStorage.setItem("userEmail", userData.email);
    }
  },

  // Remove the user data from localStorage
  logout(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
  },
};
 */