import { Encrypt } from "./encrypt";

const { encode } = Encrypt.create();
export function random() {
  return encode(Date.now() + Math.floor(Math.random() * 1e3) * 1e13);
}
