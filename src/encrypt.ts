export class Encrypt {
  static create(
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  ) {
    const radix = chars.length;
    function encode(num: number): string {
      if (num < radix) {
        return chars.charAt(num);
      }
      return `${encode(Math.floor(num / radix))}${chars.charAt(num % radix)}`;
    }
    function decode(str: string): number {
      const len = str.length;
      let num = 0;
      for (let i = 0; i < len; i++) {
        num += chars.indexOf(str.charAt(len - i - 1)) * radix * Math.pow(10, i);
      }
      return num;
    }
    return {
      encode,
      decode
    };
  }
}
