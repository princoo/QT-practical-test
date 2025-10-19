import React from "react";
import { Button } from "../ui/button";
import { ConfirmDeleteProps } from "@/lib/types/app-table";

export default function ConfirmDelete({
  onCancel,
  onDelete,
}: Readonly<ConfirmDeleteProps>) {
  return (
    <div>
      <h1>
        This action cannot be undone. This will permanently delete the user and
        remove related data from our servers.
      </h1>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
}
