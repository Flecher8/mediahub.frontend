export const rounter = {
	home: "/",
	login: "/login",
	registration: "/register",
	profile(userId: string){ return (`/profile/` + userId)}
};
