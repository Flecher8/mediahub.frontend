import { rounter } from "@/app/router";
import Link from "next/link";

export default function LoggedOutHeader() {
	return (
		<div className="navbar bg-base-200 px-4">
			<div className="navbar-start">
				{/* Mobile view: visible on small screens */}
				<div className="flex w-full items-center md:hidden lg:hidden">
					<div className="flex-none">
						<div className="dropdown">
							<label tabIndex={0} className="btn btn-ghost">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</label>
							<ul
								tabIndex={0}
								className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
								<li>
									<Link href="/" className="btn btn-ghost normal-case text-lg">
										Library
									</Link>
								</li>
								<li>
									<Link href="/" className="btn btn-ghost normal-case text-lg">
										Collections
									</Link>
								</li>
								<li>
									<Link href="/" className="btn btn-ghost normal-case text-lg">
										About
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="flex-grow">
						<Link href="/" className="text-xl font-bold">
							MediaHUB
						</Link>
					</div>
				</div>

				{/* Desktop view: visible on medium and larger screens */}
				<div className="hidden md:flex lg:flex items-center">
					<Link href="/" className="text-xl font-bold">
						MediaHUB
					</Link>
				</div>
			</div>

			{/* Desktop menu: shown only on medium and larger screens */}
			<div className="hidden md:flex lg:flex navbar-end space-x-4">
				<Link href="/" className="btn btn-ghost normal-case text-lg">
					Library
				</Link>
				<Link href="/" className="btn btn-ghost normal-case text-lg">
					Collections
				</Link>
				<Link href="/" className="btn btn-ghost normal-case text-lg">
					About
				</Link>
				<Link href={rounter.login} className="btn btn-ghost normal-case text-lg">
					Log in
				</Link>
				<Link href={rounter.registration} className="btn btn-primary normal-case text-lg">
					Sign up
				</Link>
			</div>

			<div className="flex md:hidden lg:hidden navbar-end space-x-4">
				<Link href={rounter.registration} className="btn btn-primary normal-case text-lg">
					Sign up
				</Link>
			</div>
		</div>
	);
}
