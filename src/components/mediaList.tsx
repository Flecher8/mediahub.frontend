import { MediaContent } from "@/types/mediaContent";
import MediaListItem from "./mediaListItem";
import { useState } from "react";
import DeleteMediaConfirmationModal from "./models/deleteMediaConfirmationModal";
import { CollectionsService } from "@/services/collectionsService";

interface MediaListProps {
	mediaItems: MediaContent[];
	collectionId: string;
}

export default function MediaList({ mediaItems, collectionId }: MediaListProps) {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedMedia, setSelectedMedia] = useState<MediaContent | null>(null);

	const handleRequestDelete = (media: MediaContent) => {
		setSelectedMedia(media);
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = () => {
		if (selectedMedia) {
			CollectionsService.removeMediaFromCollection(collectionId, selectedMedia.mediaContentId);
			window.location.reload();
		}
		setIsDeleteModalOpen(false);
		setSelectedMedia(null);
	};

	const handleCancelDelete = () => {
		setIsDeleteModalOpen(false);
		setSelectedMedia(null);
	};

	return (
		<>
			<div className="flex flex-col gap-4 w-full h-full container">
				{mediaItems.map(media => (
					<MediaListItem
						key={media.mediaContentId}
						media={media}
						collectionId={collectionId}
						onRequestDelete={handleRequestDelete}
					/>
				))}
			</div>
			<DeleteMediaConfirmationModal
				isOpen={isDeleteModalOpen}
				mediaName={selectedMedia?.title || ""}
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
			/>
		</>
	);
}
