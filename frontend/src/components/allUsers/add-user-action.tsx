"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { UserForm } from "./user-form";
import { UserFormData } from "@/lib/schemas/user-schema";
import { useAddUserMutation } from "@/lib/services/client/user";
import { toast } from "sonner";
import { revalidateResource } from "@/actions/user";
import { BaseDialog } from "../custom/base-dialog";
import { Plus } from "lucide-react";

export default function AddUser() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addUser] = useAddUserMutation();
  async function handleFormSubmit(data: UserFormData) {
    try {
      addUser(data).unwrap();
      await revalidateResource("WeeklyUser");
      setIsAddModalOpen(false);
      toast.success("User added successfully");
    } catch {
      toast.error("Failed to add user");
    }
  }
  return (
    <div className="mb-3">
      <Button onClick={() => setIsAddModalOpen(true)}>
        <Plus />
        <span>Add User</span>
      </Button>
      <BaseDialog
        title="Add User"
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      >
        <UserForm
          onSubmit={handleFormSubmit}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </BaseDialog>
    </div>
  );
}
