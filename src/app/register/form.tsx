"use client";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/auth/authService";
import { redirect } from "next/dist/server/api-utils";

// Define the Zod schema for registration with password confirmation
const registrationSchema = z
	.object({
		email: z.string().nonempty("Email is required").email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string().nonempty("Confirm password is required")
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

// Infer the form data type from the schema
type RegistrationFormInputs = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
	const { register, handleSubmit, control } = useForm<RegistrationFormInputs>({
		resolver: zodResolver(registrationSchema)
	});

	// Subscribe to form state (errors)
	const { errors } = useFormState({ control });

	const onSubmit = async (data: RegistrationFormInputs) => {
		// Extract only the email and password to send to the backend
		const registrationData = {
			email: data.email,
			password: data.password
		};

		const result = await registerUser(registrationData);
		if (result.success) {
			redirect(null, '/');
			console.log("Login successful", result.success);
		} else {
			// Handle error (e.g. show an error message in the UI)
			console.error("Login error:", result.error ? result.error : "");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="form-control">
				<label htmlFor="email" className="label">
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
				<label htmlFor="password" className="label">
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

			<div className="form-control">
				<label htmlFor="confirmPassword" className="label">
					<span className="label-text">Confirm Password</span>
				</label>
				<input
					type="password"
					id="confirmPassword"
					placeholder="Confirm your password"
					className="input input-bordered"
					{...register("confirmPassword")}
				/>
				{errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
			</div>

			<div className="form-control mt-6 flex justify-center">
				<button type="submit" className="btn btn-primary text-lg">
					Register
				</button>
			</div>
		</form>
	);
}
