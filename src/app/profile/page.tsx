"use client";
import { AuthStore, UserData } from "@/services/auth/auth";
import { useEffect, useState } from "react";

export default function ProfilePage() {
	const [user, setUser] = useState<UserData | null>(null);

	useEffect(() => {
		// only runs in the browser
		setUser(AuthStore.getUserData());
	}, []);

	return (
		<div className="flex items-center justify-center h-full">
			<div className="card w-96 bg-base-100 shadow-xl">
				<div className="card-body">
					<h1 className="card-title justify-center text-3xl">Profile</h1>
					<p className="text-center mt-4">
						Email: <span className="font-medium">{user?.email ?? "N/A"}</span>
					</p>
				</div>
			</div>
		</div>
	);
}
