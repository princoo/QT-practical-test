import { JWKS } from "@/lib/types/crypto";
import { apiFetch } from "./fetch-helper";

let cachedCryptoKey: CryptoKey | null = null;

export async function getPublicKey(): Promise<CryptoKey> {
  if (cachedCryptoKey) {
    console.log("Using cached public key");
    return cachedCryptoKey;
  }

  try {
    const response = await apiFetch<JWKS>("/.well-known/jwks.json");
    if(response.success === false){
      throw new Error("Failed to fetch JWKS");
    }
    if (!response.data || response.data.keys.length === 0) {
      throw new Error("No keys found in JWKS");
    }
    
    const jwk = response.data.keys[0];

    cachedCryptoKey = await crypto.subtle.importKey(
      "jwk",
      jwk,
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-384",
      },
      false,
      ["verify"]
    );

    return cachedCryptoKey;
  } catch {
    throw new Error("Failed to load public key from JWKS");
  }
}


export async function verifySignature(
  email: string,
  signature: string
): Promise<boolean> {
  try {
    const publicKey = await getPublicKey();
    const signatureBuffer = Uint8Array.from(atob(signature), (c) =>
      c.charCodeAt(0)
    );
    const encoder = new TextEncoder();
    const emailData = encoder.encode(email);
    const hashBuffer = await crypto.subtle.digest("SHA-384", emailData);

    const isValid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      publicKey,
      signatureBuffer,
      hashBuffer
    );
    return isValid;
  } catch {
    return false;
  }
}