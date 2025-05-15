const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Use your backend's base URL
// TODO Change Endpoints according to backend
export const apiEndpoints = {
	auth: {
		login: `/login`,
		register: `/register`,
		refreshToken: `${BASE_URL}/refresh-token`
	},
	mediaContent: {
		getAll: `/api/mediaContent`,
		getById: (contentId: string) => `${BASE_URL}/mediaContent/${contentId}`,
		create: `${BASE_URL}/mediaContent`,
		update: (contentId: string) => `${BASE_URL}/mediaContent/${contentId}`,
		delete: (contentId: string) => `${BASE_URL}/mediaContent/${contentId}`
	}
};

export default apiEndpoints;
