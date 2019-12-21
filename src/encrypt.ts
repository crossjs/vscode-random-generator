export class Encrypt {
  static create(
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  ) {
    const radix = chars.length;
    function encode(num: number): string {
      if (num < radix) {
        return chars.charAt(num);
      }
      const remainder = num % radix;
      return `${encode((num - remainder) / radix)}${chars.charAt(remainder)}`;
    }
    function decode(str: string): number {
      const len = str.length;
      let num = 0;
      for (let i = 0; i < len; i++) {
        num += chars.indexOf(str.charAt(len - i - 1)) * radix ** i;
      }
      return num;
    }
    return {
      encode,
      decode
    };
  }
}
