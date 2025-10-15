import prisma from "../config/db.js";
import { hashEmail, signHash, getPublicKey } from "../utils/crypto.js";

export const createUser = async ({ email, role, status }) => {
  const hash = hashEmail(email);
  const signature = signHash(hash);
  const user = await prisma.user.create({
    data: {
      email,
      role,
      status,
      signature,
    },
  });

  return user;
};

export const getPublicKeyService = () => getPublicKey();
