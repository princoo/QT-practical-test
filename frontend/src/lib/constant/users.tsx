import { Column } from "../types/app-table";
import { User } from "../types/user";

export const usersColumns: Column<User>[] = [
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) =>
      value === "ACTIVE" ? (
        <span className="text-green-600 font-medium">Active</span>
      ) : (
        <span className="text-destructive font-medium">Inactive</span>
      ),
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (value: string) => new Date(value).toISOString().split("T")[0],
  },
];
