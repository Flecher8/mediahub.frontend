"use client";
import Link from "next/link";
import LoginForm from "./form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	return (
		<>
			<div className="flex items-center justify-center h-full">
				<div className="card w-96 bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title justify-center text-3xl">Login</h2>
						<LoginForm
							onSuccess={() => {
								// Redirect home after successful register+login
								router.push("/");
							}}
						/>
						<p className="text-center mt-4">
							Don&apos;t registered yet?{" "}
							<Link href="/register" className="text-accent">
								Register
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
