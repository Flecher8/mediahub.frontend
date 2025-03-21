"use client";
import React from "react";

interface DeleteMediaConfirmationModalProps {
  isOpen: boolean;
  mediaName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteMediaConfirmationModal({
  isOpen,
  mediaName,
  onConfirm,
  onCancel,
}: DeleteMediaConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Remove Media</h3>
        <p className="py-4">
          Are you sure you want to remove <strong>{mediaName}</strong> from this collection?
        </p>
        <div className="modal-action">
          <button type="button" className="btn btn-accent" onClick={onConfirm}>
            Confirm
          </button>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}
