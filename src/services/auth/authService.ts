import api from "@/lib/api";
import apiEndpoints from "@/lib/apiEndpoints";
import { ApiResponse } from "@/types/apiResponse";

export interface LoginData {
	email: string;
	password: string;
}

export interface RegistrationData {
	email: string;
	password: string;
}

export async function loginUser(loginData: LoginData): Promise<ApiResponse> {
	try {
		// Call the login endpoint with the query parameter "useCookies=true"
		const response = await api.post(apiEndpoints.auth.login + "?useCookies=true", loginData);

		// The axios instance is configured with withCredentials: true,
		// so any cookies set by the backend (like .AspNetCore.Identity.Application) are saved automatically.

		// Save the email to localStorage for later use
		if (typeof window !== "undefined") {
			localStorage.setItem("userEmail", loginData.email);
		}
		// TODO add get userId

		// Return the response data (it could be a user object, token, etc.)
		return { success: true};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error instanceof Error) console.log(error.stack);
		// Extract a useful error message from the response if available
		const errorMessage =
			error.response && error.response.data ? error.response.data : error.message || "An unexpected error occurred.";
		return { error: errorMessage };
	}
}

export async function registerUser(data: RegistrationData): Promise<ApiResponse> {
	try {
		// Call the registration endpoint
		const response = await api.post(apiEndpoints.auth.register, data);

		// Optionally, save the email in localStorage for later use
		if (typeof window !== "undefined") {
			localStorage.setItem("userEmail", data.email);
		}

		// TODO add get login and userId

		return { success: true };
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error instanceof Error) console.error(error.stack);
		const errorMessage =
			error.response && error.response.data ? error.response.data : error.message || "An unexpected error occurred.";
		return { error: errorMessage };
	}
}
