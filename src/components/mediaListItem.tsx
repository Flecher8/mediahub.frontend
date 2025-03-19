// components/MediaListItem.tsx
"use client";
import { Media } from "@/types/media";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface MediaListItemProps {
  media: Media;
  collectionId: string;
}

export default function MediaListItem({ media, collectionId }: MediaListItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    // In a real app, call an API or update state to remove media from the collection
    console.log(`Deleting media ${media.id} from collection ${collectionId}`);
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-base-200 p-4 rounded flex items-center justify-between container mx-auto">
      {/* Left side: Image + Info */}
      <div className="flex gap-4">
        <img src={media.image} alt={media.name} className="object-cover rounded w-[300px] h-[400px]" />
        <div>
          <h2 className="text-5xl font-bold truncate">{media.name}</h2>
          <p className="text-2xl">Type: {media.type || "Unknown"}</p>
          <p className="text-2xl">
            Genres: {media.genres.map((g) => g.name).join(", ")}
          </p>
        </div>
      </div>

      {/* Right side: Delete button */}
      <button className="btn btn-accent" onClick={() => setShowDeleteModal(true)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Remove Media</h3>
            <p className="py-4">
              Are you sure you want to remove <strong>{media.name}</strong> from this collection?
            </p>
            <div className="modal-action">
              <button type="button" className="btn btn-primary" onClick={handleDelete}>
                Confirm
              </button>
              <button type="button" className="btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
}
