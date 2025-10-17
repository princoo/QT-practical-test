import path from "path";
import { fileURLToPath } from "url";
import protobuf from "protobufjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.join(__dirname, "../proto/user.proto");

let UsersMessage;

export async function loadProto() {
  if (!UsersMessage) {
    try {
      const root = await protobuf.load(PROTO_PATH);
      UsersMessage = root.lookupType("UserList");
    } catch {
      throw new Error("Failed to load protobuf schema");
    }
  }
  return UsersMessage;
}

export async function encodeUsers(users) {
  try {
    const UsersMessage = await loadProto();
    const usersPayload = users.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.role,
      status: u.status,
      signature: u.signature || "",
      createdAt: u.createdAt instanceof Date ? u.createdAt.toISOString() : u.createdAt,
    }));
    const errMsg = UsersMessage.verify({ users: usersPayload });
    if (errMsg) {
      throw new Error(`Protobuf verification failed: ${errMsg}`);
    }

    const message = UsersMessage.create({ users: usersPayload });
    const buffer = UsersMessage.encode(message).finish();

    return Buffer.from(buffer);
  } catch (error) {
    throw new Error(`Failed to encode users: ${error.message}`);
  }
}

export async function decodeUsers(buffer) {
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
    throw new Error(`Failed to decode protobuf: ${error.message}`);
  }
}
