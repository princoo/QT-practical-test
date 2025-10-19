"use client";
import { useUsersTable } from "@/lib/hooks/user-table-logic";
import { User } from "@/lib/types/user";
import AppTable from "../custom/app-table";
import { usersColumns } from "@/lib/constant/users";
import { TableActions } from "./table-actions";
import { useState } from "react";
import { UserForm } from "./user-form";
import { UserFormData } from "@/lib/schemas/user-schema";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/lib/services/client/user";
import { toast } from "sonner";
import AddUser from "./add-user-action";
import { BaseDialog } from "../custom/base-dialog";
import ConfirmDelete from "./confirm-delete";
import { revalidateResource } from "@/actions/user";
import { set } from "zod";

export default function UsersTable() {
  const { data, loading, error, retry } = useUsersTable();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [onDelete, setOnDelete] = useState<boolean>(false);
  async function handleEditUser(user: User) {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }
  async function handleDeleteUser() {
    try {
      toast.promise(deleteUser(selectedUser?.id as string).unwrap(), {
        loading: "Deleting user...",
        success: "User deleted successfully",
        error: "Failed to delete user",
      });

      await revalidateResource("WeeklyUser");
      setOnDelete(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }
  async function ConfirmDeleteUser(user: User) {
    setSelectedUser(user);
    setOnDelete(true);
  }
  async function handleFormSubmit(data: UserFormData) {
    try {
      await updateUser({ id: selectedUser?.id as string, data }).unwrap();
      toast.success("User updated successfully");
      setSelectedUser(null);
      setIsEditModalOpen(false);
    } catch {
      toast.success("Failed to update user");
    }
  }
  return (
    <div>
      <AddUser />
      <AppTable<User>
        columns={usersColumns}
        data={data}
        isLoading={loading}
        error={error}
        retry={retry}
        emptyMessage="No users found"
        actionsLabel="Actions"
        renderActions={(row) => (
          <TableActions<User>
            row={row}
            onDelete={ConfirmDeleteUser}
            onEdit={handleEditUser}
          />
        )}
      />
      <BaseDialog
        title="Edit User"
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      >
        {selectedUser && (
          <UserForm
            user={selectedUser}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </BaseDialog>
      <BaseDialog
        title="Are you sure you want to delete this user?"
        open={onDelete}
        onOpenChange={setOnDelete}
      >
        <ConfirmDelete
          onCancel={() => setOnDelete(false)}
          onDelete={handleDeleteUser}
        />
      </BaseDialog>
    </div>
  );
}
