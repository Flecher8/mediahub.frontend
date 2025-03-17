"use client";
import CollectionsGrid from "@/components/collectionsGrid";
import { testCollection } from "@/services/test/testCollection";
import CreateCollectionModal from "@/components/createCollectionModal";
import Link from "next/link";

export default function CollectionsPage() {
	const handleCreateCollection = (name: string) => {
		console.log("Create collection:", name);
		// TODO: Replace with actual collection creation logic (e.g. API call or state update)
	};

	return (
		<div className="p-4">
			{/* Header: Create button and title */}
			<div className="flex items-center justify-between gap-4 mb-4">
				<h1 className="text-3xl font-bold">Collections</h1>
				<button className="btn btn-accent" onClick={() => (document.getElementById("my_modal_5") as HTMLDialogElement)?.showModal()}>
					Create
				</button>
			</div>

			{/* Collections Grid */}
			<CollectionsGrid collectionList={testCollection} />

      {/* Create Collection Modal */}
      <CreateCollectionModal onCreate={handleCreateCollection} />
		</div>
	);
}
