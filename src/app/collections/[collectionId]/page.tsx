"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { testCollection } from "@/services/test/testCollection";
import MediaList from "@/components/mediaList";
import { useEffect, useState } from "react";
import { RecommendationCollection } from "@/types/recommendationCollection";
import { CollectionsService } from "@/services/collectionsService";
import { MediaContent } from "@/types/mediaContent";

export default function CollectionPage() {
	// Retrieve the [collectionId] from URL params
	const params = useParams();
	const collectionId = params?.collectionId as string | undefined;

	// For now, we use test data. Later, fetch from your API using collectionId.
	// const collection = testCollection.find(c => c.collectionId === collectionId);
	if (collectionId === undefined) {
		return <div>Missing collection</div>;
	}

	const [collectionMedia, setCollectionMedia] = useState<MediaContent[] | null>(null);
	const [collection, setCollection] = useState<RecommendationCollection | undefined>(undefined);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!collectionId) return;
		CollectionsService.getCollectionById(collectionId)
			.then(setCollection)
			.catch(e => setError(e.message));
		CollectionsService.getMediaInCollection(collectionId)
			.then(setCollectionMedia)
			.catch(e => setError(e.message));
	}, [collectionId]);

	if (!collection) {
		return <div>Loading...</div>;
	}
	if (!collectionMedia) {
		return <div>Loading...</div>;
	}

	if (error !== null) {
		return <div>Error</div>;
	}

	return (
		<div className="w-full h-full">
			{/* Header: Name and Settings Button */}
			<div className="flex justify-center mb-4 p-4">
				<div className="container flex items-center justify-between w-full h-full pb-4 border-b border-neutral">
					<h1 className="text-3xl font-bold truncate max-w-[500px]">{collection.name}</h1>
					<Link href={`/collections/${collection.collectionId}/settings`} className="btn btn-accent">
						Settings
					</Link>
				</div>
			</div>
			<div className="flex justify-center w-full p-4">
				{/* Media List */}
				<MediaList mediaItems={collection.mediaItems} collectionId={collection.collectionId} />
			</div>
		</div>
	);
}
