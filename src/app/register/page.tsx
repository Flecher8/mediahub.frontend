"use client";
import Link from "next/link";
import RegistrationForm from "./form";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-center h-full">
				<div className="card w-96 bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title justify-center text-3xl">Register</h2>
						<RegistrationForm
							onSuccess={() => {
								// Redirect home after successful register+login
								router.push("/");
							}}
						/>
						<p className="text-center mt-4">
							Already registered?{" "}
							<Link href="/login" className="text-accent">
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
