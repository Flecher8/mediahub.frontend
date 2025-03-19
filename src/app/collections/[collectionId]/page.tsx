"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { testCollection } from "@/services/test/testCollection";
import MediaList from "@/components/mediaList";

export default function CollectionPage() {
	// Retrieve the [collectionId] from URL params
	const params = useParams();
	const collectionId = params?.collectionId as string | undefined;

	if (!collectionId) {
		return <div>Missing collectionId</div>;
	}

	// For now, we use test data. Later, fetch from your API using collectionId.
	const collection = testCollection.find(c => c.id === collectionId);
	if (collection === undefined) {
		return <div>Missing collection</div>;
	}

	return (
		<div className="">
			{/* Header: Name and Settings Button */}
			<div className="flex items-center justify-between mb-4 bg-neutral p-4">
				<h1 className="text-3xl font-bold truncate max-w-[500px]">{collection.name}</h1>
				<Link href={`/collections/${collection.id}/settings`} className="btn btn-accent">
					Settings
				</Link>
			</div>
			<div className="p-4">
				{/* Media List */}
				<MediaList mediaItems={collection.mediaItems} collectionId={collection.id} />
			</div>
		</div>
	);
}
