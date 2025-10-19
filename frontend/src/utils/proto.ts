import protobuf from "protobufjs";
import { User } from "@/lib/types/user";
import { handleError } from "./response-handlers";

const protoDefinition = `
syntax = "proto3";

package user;

message User {
  string id = 1;
  string email = 2;
  string role = 3;
  string status = 4;
  string createdAt = 5;
  string signature = 6;
}

message UserList {
  repeated User users = 1;
}
`;

let UsersMessage: protobuf.Type | null = null;

export async function loadProto() {
  if (!UsersMessage) {
    try {
      const root = protobuf.parse(protoDefinition).root;
      UsersMessage = root.lookupType("user.UserList");
    } catch {
      throw new Error("Failed to load protobuf schema");
    }
  }
  return UsersMessage;
}

export async function decodeUsers(buffer: ArrayBuffer): Promise<User[]> {
  try {
    const UsersMessage = await loadProto();

    const decoded = UsersMessage.decode(new Uint8Array(buffer));
    const result = UsersMessage.toObject(decoded, {
      longs: String,
      enums: String,
      bytes: String,
    });

    return result.users || [];
  } catch (error) {
    const errorResponse = handleError(error);
    throw new Error(errorResponse.message);
  }
}
