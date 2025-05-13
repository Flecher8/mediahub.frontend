export const rounter = {
	home: "/",
	login: "/login",
	registration: "/register",
	library: "/library",
	collections: "/collections",
	about: "/about",
	profile(userId: string){ return (`/profile/` + userId)}
};
