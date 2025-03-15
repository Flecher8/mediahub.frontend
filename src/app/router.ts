export const rounter = {
	home: "/",
	login: "/login",
	registration: "/register",
	library: "/library",
	profile(userId: string){ return (`/profile/` + userId)}
};
