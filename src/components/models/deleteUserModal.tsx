"use client";
import React from "react";

interface DeleteUserModalProps {
  isOpen: boolean;
  userEmail: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteUserModal({
  isOpen,
  userEmail,
  onConfirm,
  onCancel,
}: DeleteUserModalProps) {
  if (!isOpen) return null;

  return (
    <dialog
      open
      className="modal modal-bottom sm:modal-middle"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Remove User</h3>
        <p className="py-4">
          Are you sure you want to remove user <strong>{userEmail}</strong> from this collection?
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
