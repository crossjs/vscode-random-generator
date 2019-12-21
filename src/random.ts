import { Encrypt } from "./encrypt";

const { encode } = Encrypt.create();
const seed = Number.MAX_SAFE_INTEGER - 1e15 - 1e14;

export function random() {
  return encode(1e15 + Math.floor(Math.random() * seed) + Date.now());
}
