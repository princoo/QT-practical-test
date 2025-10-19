import { z } from "zod";
import { UserRoleEnum, UserStatusEnum } from "../enums/user-enum";

export const userSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  role: z.enum(
    [UserRoleEnum.ADMIN, UserRoleEnum.USER] as const,
    "Invalid Role"
  ),
  status: z.enum(
    [UserStatusEnum.ACTIVE, UserStatusEnum.INACTIVE] as const,
    "Status must be active or inactive"
  ),
});

export type UserFormData = z.infer<typeof userSchema>;
