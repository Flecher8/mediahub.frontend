import api from "@/lib/api";
import apiEndpoints from "@/lib/apiEndpoints";
import { ApiResponse } from "@/types/apiResponse";
import { AuthStore, UserData } from "./auth";

export interface LoginData {
	email: string;
	password: string;
}

export interface RegistrationData {
	email: string;
	password: string;
}

export async function registerUser(data: RegistrationData): Promise<ApiResponse> {
	try {
		// 1) Create account
		await api.post(apiEndpoints.auth.register, data);

		// 2) Immediately log in
		return await loginUser({ email: data.email, password: data.password });
	} catch (err: any) {
		// console.error("Registration failed:", err);
		const message = err.response?.data?.error || err.response?.data?.message || err.message || "Registration failed";
		return { error: message };
	}
}

export async function loginUser(loginData: LoginData): Promise<ApiResponse> {
	try {
		// 1) Perform login (cookies, etc.)
		await api.post(apiEndpoints.auth.login, loginData);

		// 2) Fetch the user’s ID by email
		const { data } = await api.get<{ userId: string }>(`/api/Users/by-email/${encodeURIComponent(loginData.email)}`);
		const user: UserData = { id: data.userId, email: loginData.email };

		// 3) Persist into AuthStore
		AuthStore.setUserData(user);

		return { success: true };
	} catch (err: any) {
		// console.error("Login failed:", err);
		const message = err.response?.data?.error || err.response?.data?.message || err.message || "Login failed";
		return { error: message };
	}
}
