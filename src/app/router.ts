export const rounter = {
	home: "/",
	login: "/login",
	registration: "/register",
	library: "/library",
	collections: "/collections",
	profile(userId: string){ return (`/profile/` + userId)}
};
