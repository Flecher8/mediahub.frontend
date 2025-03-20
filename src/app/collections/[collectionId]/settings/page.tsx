"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { testCollection } from "@/services/test/testCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AddUserModal from "@/components/models/addUserModal";
import DeleteUserModal from "@/components/models/deleteUserModal";
import DeleteCollectionModal from "@/components/models/deleteCollectionModal";

interface CollectionUser {
  id: string;
  email: string;
}

export default function CollectionSettingsPage() {
  const params = useParams();
  const collectionId = params?.collectionId as string | undefined;

  if (!collectionId) return <div>Missing collectionId</div>;

  const initialCollection = testCollection.find((c) => c.id === collectionId);
  if (!initialCollection) return <div>Missing collection</div>;

  // State for collection name editing
  const [collectionName, setCollectionName] = useState(initialCollection.name);

  // Simulated user list (only emails)
  const [users, setUsers] = useState<CollectionUser[]>([
    { id: "1", email: "john@example.com" },
    { id: "2", email: "jane@example.com" },
  ]);

  // State to control modals for adding and deleting users
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<CollectionUser | null>(null);

  // State for Delete Collection modal
  const [isDeleteCollectionModalOpen, setIsDeleteCollectionModalOpen] = useState(false);

  const handleSaveChanges = () => {
    console.log(`Saving changes for collection ${collectionId}: new name = ${collectionName}`);
    // TODO: API call to update the collection name.
  };

  // Open the delete collection modal instead of using confirm()
  const openDeleteCollectionModal = () => {
    setIsDeleteCollectionModalOpen(true);
  };

  const handleConfirmDeleteCollection = () => {
    console.log(`Deleting collection ${collectionId}`);
    // TODO: API call to delete the collection.
    setIsDeleteCollectionModalOpen(false);
  };

  const handleCancelDeleteCollection = () => {
    setIsDeleteCollectionModalOpen(false);
  };

  // Handlers for managing users (Add and Delete)
  const handleAddUser = (email: string) => {
    const newUser = { id: Date.now().toString(), email };
    setUsers((prev) => [...prev, newUser]);
    console.log(`Added user ${email} to collection ${collectionId}`);
    // TODO: API call to add the user.
    setIsAddUserModalOpen(false);
  };

  const handleRequestDeleteUser = (user: CollectionUser) => {
    setUserToDelete(user);
  };

  const handleConfirmDeleteUser = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      console.log(`Removed user ${userToDelete.email} from collection ${collectionId}`);
      // TODO: API call to remove the user.
      setUserToDelete(null);
    }
  };

  const handleCancelDeleteUser = () => {
    setUserToDelete(null);
  };

  return (
    <div className="p-4 space-y-6 w-full container">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Link href={`/collections/${collectionId}`} className="btn btn-ghost">
          Return
        </Link>
      </div>

      {/* Collection Edit Section */}
      <div className="card bg-base-100 shadow-xl p-4 gap-5">
        <h2 className="text-xl font-bold mb-2">Edit</h2>
        <div className="form-control mb-4">
          <label className="label">Name</label>
          <input
            type="text"
            className="input input-bordered"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
        </div>
        <div className="flex gap-4 justify-between">
          <button className="btn btn-success btn-outline" onClick={handleSaveChanges}>
            Save Changes
          </button>
          <button className="btn btn-error btn-outline" onClick={openDeleteCollectionModal}>
            Delete Collection
          </button>
        </div>
      </div>

      {/* Manage Users Section */}
      <div className="card bg-base-100 shadow-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Manage Users</h2>
          <button className="btn btn-primary" onClick={() => setIsAddUserModalOpen(true)}>
            Add User
          </button>
        </div>
        {/* Users List */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>
                    <button className="btn btn-accent btn-sm" onClick={() => handleRequestDeleteUser(user)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center">
                    No users in this collection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onAdd={handleAddUser}
        onCancel={() => setIsAddUserModalOpen(false)}
      />

      {/* Delete User Modal */}
      <DeleteUserModal
        isOpen={!!userToDelete}
        userEmail={userToDelete?.email || ""}
        onConfirm={handleConfirmDeleteUser}
        onCancel={handleCancelDeleteUser}
      />

      {/* Delete Collection Modal */}
      <DeleteCollectionModal
        isOpen={isDeleteCollectionModalOpen}
        collectionName={collectionName}
        onConfirm={handleConfirmDeleteCollection}
        onCancel={handleCancelDeleteCollection}
      />
    </div>
  );
}
