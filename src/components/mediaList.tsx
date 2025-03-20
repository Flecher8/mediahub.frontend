import { Media } from "@/types/media";
import MediaListItem from "./mediaListItem";
import { useState } from "react";
import DeleteMediaConfirmationModal from "./models/deleteMediaConfirmationModal";

interface MediaListProps {
	mediaItems: Media[];
	collectionId: string;
}

export default function MediaList({ mediaItems, collectionId }: MediaListProps) {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

	const handleRequestDelete = (media: Media) => {
		setSelectedMedia(media);
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = () => {
		if (selectedMedia) {
			console.log(`Deleting media ${selectedMedia.id} from collection ${collectionId}`);
			// TODO: Replace with your deletion logic (API call or state update)
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
						key={media.id}
						media={media}
						collectionId={collectionId}
						onRequestDelete={handleRequestDelete}
					/>
				))}
			</div>
			<DeleteMediaConfirmationModal
				isOpen={isDeleteModalOpen}
				mediaName={selectedMedia?.name || ""}
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
			/>
		</>
	);
}
