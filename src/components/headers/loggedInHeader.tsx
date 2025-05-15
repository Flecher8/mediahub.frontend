"use client";
import { rounter } from "@/app/router";
import { AuthStore, UserData } from "@/services/auth/auth";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRightFromBracket, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { SelectedCollection, SelectedCollectionService } from "@/services/storages/selectedCollectionService";
import { useEffect, useState } from "react";
import { CollectionsService } from "@/services/collectionsService";
import { useRouter } from "next/navigation";

interface LoggedInHeaderProps {
	user: UserData | null;
}

export default function LoggedInHeader({ user }: LoggedInHeaderProps) {
	const nextNav = useRouter();

	const [collections, setCollections] = useState<SelectedCollection[]>([]);
	const [current, setCurrent] = useState<SelectedCollection | null>(null);

	// Load user collections + initial selection
	useEffect(() => {
		if (!user) return;
		CollectionsService.getUserCollections(user.id)
			.then(cols => {
				// Map to only id+name
				const list = cols.map(c => ({ id: c.collectionId, name: c.name }));
				setCollections(list);

				// load saved or pick first
				const saved = SelectedCollectionService.get();
				if (saved && list.some(c => c.id === saved.id)) {
					setCurrent(saved);
				} else if (list.length) {
					setCurrent(list[0]);
					SelectedCollectionService.set(list[0]);
				}
			})
			.catch(console.error);
	}, [user]);

	const handleSelect = (col: SelectedCollection) => {
		setCurrent(col);
		SelectedCollectionService.set(col);
	};

	const handleLogout = (e: React.MouseEvent) => {
		e.preventDefault();
		AuthStore.clear();

		// tell everyone auth just changed
		window.dispatchEvent(new Event("auth-change"));

		nextNav.push(rounter.home);
	};

	if (!user) return;

	return (
		<div className="navbar bg-base-200 px-4 container">
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
									<Link href={rounter.about} className="btn btn-ghost normal-case text-lg">
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
				<Link href={rounter.library} className="btn btn-ghost normal-case text-lg">
					Library
				</Link>
				<Link href={rounter.collections} className="btn btn-ghost normal-case text-lg">
					Collections
				</Link>
				<Link href={rounter.about} className="btn btn-ghost normal-case text-lg">
					About
				</Link>
				{/* Collections dropdown */}
				<div className="dropdown dropdown-end">
					<label
						tabIndex={0}
						className="btn btn-ghost flex items-center gap-2 max-w-[320px] overflow-hidden whitespace-nowrap">
						<span className="truncate">{current?.name || "Select Collection"}</span>
						<FontAwesomeIcon icon={faChevronDown} />
					</label>
					<ul tabIndex={0} className="dropdown-content menu bg-base-100 p-2 shadow rounded-box w-52">
						{collections.map(col => (
							<li key={col.id}>
								<button
									className="w-full text-left max-w-[320px] overflow-hidden whitespace-nowrap truncate"
									onClick={() => handleSelect(col)}>
									{col.name}
								</button>
							</li>
						))}
					</ul>
				</div>

				<Link href={rounter.profile} className="btn btn-accent normal-case text-lg">
					<FontAwesomeIcon icon={faUser} />
				</Link>
				<Link href={"/"} onClick={handleLogout} className="btn btn-accent btn-outline normal-case text-lg">
					<FontAwesomeIcon icon={faArrowRightFromBracket} />
				</Link>
			</div>

			<div className="flex md:hidden lg:hidden navbar-end space-x-4">
				{/* Collections dropdown */}
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost flex items-center gap-2">
						{current?.name || "Select Collection"}
						<FontAwesomeIcon icon={faChevronDown} />
					</label>
					<ul tabIndex={0} className="dropdown-content menu bg-base-100 p-2 shadow rounded-box w-52">
						{collections.map(col => (
							<li key={col.id}>
								<button className="w-full text-left" onClick={() => handleSelect(col)}>
									{col.name}
								</button>
							</li>
						))}
					</ul>
				</div>
				<Link href={rounter.profile} className="btn btn-accent normal-case text-lg">
					<FontAwesomeIcon icon={faUser} />
				</Link>
				<Link href={"/"} onClick={handleLogout} className="btn btn-accent btn-outline normal-case text-lg">
					<FontAwesomeIcon icon={faArrowRightFromBracket} />
				</Link>
			</div>
		</div>
	);
}
