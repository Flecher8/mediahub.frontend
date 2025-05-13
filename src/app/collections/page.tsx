"use client";
import CollectionsGrid from "@/components/collectionsGrid";
import CreateCollectionModal from "@/components/models/createCollectionModal";
import Link from "next/link";
import { RecommendationCollection } from "@/types/recommendationCollection";
import { useEffect, useState } from "react";
import { authStorage } from "@/services/auth/auth";
import { CollectionsService } from "@/services/collectionsService";

export default function CollectionsPage() {
	const [collections, setCollections] = useState<RecommendationCollection[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	const user = authStorage.getUserData();

	useEffect(() => {
		CollectionsService.getUserCollections(user.id)
			.then(setCollections)
			.catch(e => setError(e.message));
	}, []);

	if (!collections) {
		return <div>Loading...</div>;
	}

	if (error !== null) {
		return <div>Error</div>;
	}
	const handleCreateCollection = (name: string) => {
		console.log("Create collection:", name);
		CollectionsService.createCollection(user.id, name);
		window.location.reload();
	};

	return (
		<div className="flex flex-col justify-center w-full h-full container">
			{/* Header: Create button and title */}
			<div className="flex justify-center w-full">
				<div className="flex items-center justify-between gap-4 mb-4 p-4 w-full pb-4 border-b border-neutral">
					<h1 className="text-3xl font-bold">Collections</h1>
					<button
						className="btn btn-accent"
						onClick={() => (document.getElementById("my_modal_5") as HTMLDialogElement)?.showModal()}>
						Create
					</button>
				</div>
			</div>
			<div className="p-4">
				{/* Collections Grid */}
				<CollectionsGrid collectionList={collections} />

				{/* Create Collection Modal */}
				<CreateCollectionModal onCreate={handleCreateCollection} />
			</div>
		</div>
	);
}
