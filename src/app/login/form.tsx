"use client";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/services/auth/authService";

// Define the Zod schema for validation
const loginSchema = z.object({
	email: z.string().nonempty("Email is required").email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters")
});

// Infer the form data type from the schema
type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const { register, handleSubmit, control } = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema)
	});

	// Subscribe to form state (errors)
	const { errors } = useFormState({ control });

	const onSubmit = async (data: LoginFormInputs) => {
		// Extract only the email and password to send to the backend
		const loginData = {
			email: data.email,
			password: data.password
		};

		const result = await loginUser(loginData);
		if (result.success) {
			// Handle success (e.g. redirect or show a success message)
			console.log("Login successful", result.success);
		} else {
			// Handle error (e.g. show an error message in the UI)
			console.error("Login error:", result.error ? result.error : '');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="form-control">
				<label className="label" htmlFor="email">
					<span className="label-text">Email</span>
				</label>
				<input
					type="email"
					id="email"
					placeholder="Enter your email"
					className="input input-bordered"
					{...register("email")}
				/>
				{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
			</div>
			<div className="form-control">
				<label className="label" htmlFor="password">
					<span className="label-text">Password</span>
				</label>
				<input
					type="password"
					id="password"
					placeholder="Enter your password"
					className="input input-bordered"
					{...register("password")}
				/>
				{errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
			</div>
			<div className="form-control mt-8 flex justify-center">
				<button type="submit" className="btn btn-primary text-lg">
					Login
				</button>
			</div>
		</form>
	);
}
