// src/lib/api.ts
import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL, // Use an env variable for your API URL
	timeout: 10000, // Optional timeout setting
  withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
});

// Optionally, add interceptors for request/response handling
api.interceptors.request.use(config => {
	// You could add auth tokens here or modify headers if needed
	return config;
});

export default api;
