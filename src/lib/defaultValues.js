import crypto from "crypto";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateRandHexEncodedNamespaceID() {
  const nID = crypto.randomBytes(8);
  return nID.toString("hex");
}

export function generateRandMessage() {
  const lenMsg = randomInt(0, 100);
  const msg = crypto.randomBytes(lenMsg);
  return msg.toString("hex");
}
