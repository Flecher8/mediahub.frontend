"use client";
import React from "react";

interface DeleteCollectionModalProps {
  isOpen: boolean;
  collectionName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteCollectionModal({
  isOpen,
  collectionName,
  onConfirm,
  onCancel,
}: DeleteCollectionModalProps) {
  if (!isOpen) return null;

  // Close modal if clicking outside the modal box
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <dialog
      open
      className="modal modal-bottom sm:modal-middle"
      onClick={handleDialogClick}
    >
      <form method="dialog" className="modal-box bg-black text-white">
        <h3 className="font-bold text-lg">Delete Collection</h3>
        <p className="py-4">
          Are you sure you want to delete the collection{" "}
          <strong>{collectionName}</strong>?
        </p>
        <div className="modal-action">
          <button type="button" className="btn btn-error" onClick={onConfirm}>
            Delete
          </button>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}
