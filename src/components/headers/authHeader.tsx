"use client";

import { useState, useEffect } from "react";
import LoggedInHeader from "./loggedInHeader";
import LoggedOutHeader from "./loggedOutHeader";
import { AuthStore, UserData } from "@/services/auth/auth";
import { usePathname } from "next/navigation";

export default function AuthHeader() {
	const [isAuth, setIsAuth] = useState(false);
	const [user, setUser] = useState<UserData | null>(null);
	const pathname = usePathname();

	// any time the route changes, re-check auth
	useEffect(() => {
		// only runs in the browser
		setIsAuth(AuthStore.isAuthorized());
		setUser(AuthStore.getUserData());
	}, [pathname]);

	// also listen for our custom "auth-change" event
	useEffect(() => {
		const onAuthChange = () => {
			setIsAuth(AuthStore.isAuthorized());
			setUser(AuthStore.getUserData());
		};

		window.addEventListener("auth-change", onAuthChange);
		return () => window.removeEventListener("auth-change", onAuthChange);
	}, []);

	return isAuth ? <LoggedInHeader user={user} /> : <LoggedOutHeader />;
}
