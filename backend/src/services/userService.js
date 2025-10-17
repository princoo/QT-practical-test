import prisma from "../config/db.js";
import { hashEmail, signHash, getPublicKey } from "../utils/crypto.js";

export async function createUserService({ email, role, status }) {
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
}

export async function updateUserService(userId, data) {
  if (data.email) {
    const emailHash = hashEmail(data.email);
    const newSignature = signHash(emailHash);
    data.signature = newSignature;
  }
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data,
  });
  return updatedUser;
}

export async function deleteUserService(userId) {
  await prisma.user.delete({ where: { id: userId } });
}
export async function getGroupedUsersService() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
  });

  const countsByDate = {};
  users.forEach((user) => {
    const dateKey = user.createdAt.toISOString().split("T")[0];
    countsByDate[dateKey] = (countsByDate[dateKey] || 0) + 1;
  });

  const result = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split("T")[0];

    result.push({
      date: dateKey,
      count: countsByDate[dateKey] || 0,
    });
  }

  return result;
}
export async function getAllusers() {
  const users = await prisma.user.findMany();
  return users;
}
export const getPublicKeyService = () => getPublicKey();
