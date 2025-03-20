"use client";
import React, { useState } from "react";

interface AddUserModalProps {
  isOpen: boolean;
  onAdd: (email: string) => void;
  onCancel: () => void;
}

export default function AddUserModal({ isOpen, onAdd, onCancel }: AddUserModalProps) {
  const [userEmail, setUserEmail] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!userEmail) {
      alert("Please enter an email.");
      return;
    }
    onAdd(userEmail);
    setUserEmail("");
  };

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
        <h3 className="font-bold text-lg">Add User</h3>
        <p className="py-4">Enter the user's email to add to the collection:</p>
        <input
          type="email"
          placeholder="User Email"
          className="input input-bordered w-full mb-4"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <div className="modal-action">
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            Add
          </button>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}
