import { Encrypt } from "./encrypt";

const { encode } = Encrypt.create();
export function random() {
  return encode(1e15 + Math.floor(Math.random() * seed) + Date.now());
}
