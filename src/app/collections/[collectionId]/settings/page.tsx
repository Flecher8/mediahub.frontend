// app/collections/[collectionId]/settings/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import AddUserModal from "@/components/models/addUserModal";
import DeleteUserModal from "@/components/models/deleteUserModal";
import DeleteCollectionModal from "@/components/models/deleteCollectionModal";

import { User } from "@/types/user";
import { CollectionsService } from "@/services/collectionsService";
import { RecommendationCollection } from "@/types/recommendationCollection";

export default function CollectionSettingsPage() {
	const params = useParams();
	const router = useRouter();
	const collectionId = params?.collectionId as string | undefined;

	// Local UI state
	const [collectionName, setCollectionName] = useState("");
	const [collection, setCollectcion] = useState<RecommendationCollection>();
	// const [users, setUsers] = useState<User[]>([]);
	const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<User | null>(null);
	const [isDeleteCollectionModalOpen, setIsDeleteCollectionModalOpen] = useState(false);

	// Load initial data
	useEffect(() => {
		if (!collectionId) return;

		// 1) Fetch collection for its name
		CollectionsService.getCollectionById(collectionId)
			.then(col => {
				if (col) {
					setCollectcion(col);
					setCollectionName(col.name);
				}
			})
			.catch(console.error);

		// 2) Fetch users in this collection
		// CollectionsService.getUsersInCollection(collectionId).then(setUsers).catch(console.error);
	}, [collectionId]);

	if (!collectionId) return <div>Missing collectionId</div>;

	// Save (rename) collection
	const handleSaveChanges = async () => {
		try {
			// If you had an update endpoint, you'd call it here.
			console.log(`(stub) rename collection ${collectionId} → ${collectionName}`);
			// await CollectionsService.renameCollection(collectionId, collectionName);
		} catch (e) {
			console.error(e);
		}
	};

	// Delete entire collection
	const handleConfirmDeleteCollection = async () => {
		if (!collectionId) return;
		try {
			await CollectionsService.deleteCollection(collectionId);
			router.push("/collections");
		} catch (e) {
			console.error(e);
		}
	};

	// Add user
	const handleAddUser = async (email: string) => {
		if (!collectionId) return;
		try {
			await CollectionsService.addUserToCollection(collectionId, email);
			setIsAddUserModalOpen(false);
			window.location.reload();
		} catch (e) {
			console.error(e);
		}
	};

	// Delete user
	const handleConfirmDeleteUser = async () => {
		if (!collectionId || !userToDelete) return;
		try {
			await CollectionsService.removeUserFromCollection(collectionId, userToDelete.id);
			// setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
			setUserToDelete(null);
			window.location.reload();
		} catch (e) {
			console.error(e);
		}
	};

	if (!collection) {
		return "Error loading collection";
	}

	const userAccessList = collection.recommendationCollectionUserAccesses ?? [];

	return (
		<div className="p-4 space-y-6 w-full container mx-auto">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold">Settings</h1>
				<Link href={`/collections/${collectionId}`} className="btn btn-soft btn-accent">
					<FontAwesomeIcon icon={faArrowLeft} />
				</Link>
			</div>

			{/* Edit Section */}
			<div className="card bg-base-100 shadow-xl p-4 gap-5">
				<h2 className="text-xl font-bold mb-2">Edit</h2>
				{/* <div className="form-control mb-4">
					<label className="label">Name</label>
					<input
						type="text"
						className="input input-bordered"
						value={collectionName}
						onChange={e => setCollectionName(e.target.value)}
					/>
				</div> */}
				<div className="flex gap-4 justify-between">
					{/* <button className="btn btn-success btn-outline" onClick={handleSaveChanges}>
						Save Changes
					</button> */}
					<button className="btn btn-error btn-outline" onClick={() => setIsDeleteCollectionModalOpen(true)}>
						Delete Collection
					</button>
				</div>
			</div>

			{/* Manage Users */}
			<div className="card bg-base-100 shadow-xl p-4">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl font-bold">Manage Users</h2>
					<button className="btn btn-primary" onClick={() => setIsAddUserModalOpen(true)}>
						Add User
					</button>
				</div>
				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
							<tr>
								<th>Email</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{userAccessList.map(({ user }) => (
								<tr key={user.id}>
									<td>{user.email}</td>
									<td>
										<button className="btn btn-accent btn-sm" onClick={() => setUserToDelete(user)}>
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</td>
								</tr>
							))}
							{userAccessList.length === 0 && (
								<tr>
									<td colSpan={2} className="text-center">
										No users in this collection.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modals */}
			<AddUserModal
				isOpen={isAddUserModalOpen}
				onAdd={handleAddUser}
				onCancel={() => setIsAddUserModalOpen(false)}
			/>

			<DeleteUserModal
				isOpen={!!userToDelete}
				userEmail={userToDelete?.email || ""}
				onConfirm={handleConfirmDeleteUser}
				onCancel={() => setUserToDelete(null)}
			/>

			<DeleteCollectionModal
				isOpen={isDeleteCollectionModalOpen}
				collectionName={collectionName}
				onConfirm={handleConfirmDeleteCollection}
				onCancel={() => setIsDeleteCollectionModalOpen(false)}
			/>
		</div>
	);
}
