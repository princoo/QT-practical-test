"use server";
import { revalidateTag } from "next/cache";

export async function revalidateResource(tag: string): Promise<void> {
  revalidateTag(tag);
}
