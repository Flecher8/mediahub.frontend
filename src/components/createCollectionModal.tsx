"use client";
import React, { useState } from "react";

interface CreateCollectionModalProps {
  onCreate: (name: string) => void;
}

export default function CreateCollectionModal({ onCreate }: CreateCollectionModalProps) {
  const [collectionName, setCollectionName] = useState("");

  const handleCreate = () => {
    // Call the onCreate callback with the entered collection name.
    onCreate(collectionName);
    // Clear the input
    setCollectionName("");
    // Close the modal
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create Collection</h3>
        <p className="py-4">Enter the name for the new collection:</p>
        <input
          type="text"
          placeholder="Collection Name"
          className="input input-bordered w-full mb-4"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleCreate}>Create</button>
          <button className="btn" onClick={() => {
            const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
            modal.close();
          }}>Close</button>
        </div>
      </div>
    </dialog>
  );
}
