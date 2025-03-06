const BASE_URL = process.env.API_URL; // Use your backend's base URL
// TODO Change Endpoints according to backend
export const apiEndpoints = {
  auth: {
    login: `${BASE_URL}/login`,
    register: `${BASE_URL}/register`,
    refreshToken: `${BASE_URL}/refresh-token`,
  },
  users: {
    getUser: (userId: string) => `${BASE_URL}/users/${userId}`,
    updateUser: (userId: string) => `${BASE_URL}/users/${userId}`,
    deleteUser: (userId: string) => `${BASE_URL}/users/${userId}`,
  },
  mediaContent: {
    getAll: `${BASE_URL}/mediaContent`,
    getById: (contentId: string) => `${BASE_URL}/mediaContent/${contentId}`,
    create: `${BASE_URL}/mediaContent`,
    update: (contentId: string) => `${BASE_URL}/mediaContent/${contentId}`,
    delete: (contentId: string) => `${BASE_URL}/mediaContent/${contentId}`,
  },
};

export default apiEndpoints;