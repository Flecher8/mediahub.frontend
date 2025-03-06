import Link from "next/link";
import LoginForm from "./form";

export default async function LoginPage() {
	return (
		<>
			<div className="flex items-center justify-center h-full">
				<div className="card w-96 bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title justify-center text-3xl">Login</h2>
						<LoginForm />
						<p className="text-center mt-4">
							Don&apos;t registered yet?{" "}
							<Link href="/register" className="text-primary">
								Register
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
