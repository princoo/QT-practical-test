import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYS_DIR = path.join(__dirname, "../keys");
const PRIVATE_KEY_PATH = path.join(KEYS_DIR, "private.pem");
const PUBLIC_KEY_PATH = path.join(KEYS_DIR, "public.pem");

function generateKeyPair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  return { privateKey, publicKey };
}

export function initializeKeys() {
  if (!fs.existsSync(KEYS_DIR)) {
    fs.mkdirSync(KEYS_DIR, { recursive: true });
    console.log("Created keys directory");
  }

  if (fs.existsSync(PRIVATE_KEY_PATH) && fs.existsSync(PUBLIC_KEY_PATH)) {
    console.log("Keys already exist, skipping generation");
    return;
  }

  console.log("Generating new RSA key pair...");
  const { privateKey, publicKey } = generateKeyPair();

  fs.writeFileSync(PRIVATE_KEY_PATH, privateKey);
  fs.writeFileSync(PUBLIC_KEY_PATH, publicKey);

  console.log("Keys generated and saved successfully");
}

export function getPrivateKey() {
  if (!fs.existsSync(PRIVATE_KEY_PATH)) {
    throw new Error("Private key not found. Run initializeKeys() first.");
  }
  return fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
}

export function getPublicKey() {
  if (!fs.existsSync(PUBLIC_KEY_PATH)) {
    throw new Error("Public key not found. Run initializeKeys() first.");
  }
  return fs.readFileSync(PUBLIC_KEY_PATH, "utf8");
}

export function hashEmail(email) {
  return crypto.createHash("sha384").update(email).digest("hex");
}

export function signHash(hash) {
  const privateKey = getPrivateKey();
  const sign = crypto.createSign("SHA384");
  sign.update(hash);
  sign.end();
  return sign.sign(privateKey, "hex");
}

export function verifySignature(hash, signature) {
  try {
    const publicKey = getPublicKey();
    const verify = crypto.createVerify("SHA384");
    verify.update(hash);
    verify.end();
    return verify.verify(publicKey, signature, "hex");
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}
