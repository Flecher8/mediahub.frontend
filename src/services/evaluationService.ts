import api from "@/lib/api";
import { Evaluation } from "@/types/evaluation";

export class EvaluationService {
	static async getAll(): Promise<Evaluation[]> {
		try {
			const response = await api.get<Evaluation[]>("/api/Evaluations");
			return response.data;
		} catch (err: any) {
			console.error("Failed to fetch evaluations:", err);
			throw new Error(err?.response?.data?.message || err.message || "Unknown error fetching evaluations");
		}
	}
}
