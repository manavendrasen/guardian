export class Utils {
  static fromStringToBuffer(data: string): ArrayBuffer {
    const encoder = new TextEncoder();

    return encoder.encode(data);

    // const enc = new TextEncoder();
    // return enc.encode(data);
  }

  static fromBufferToString(data: ArrayBuffer): string {
    const decoder = new TextDecoder('utf8');
    return decoder.decode(data);
    // const dec = new TextDecoder();

    // return dec.decode(data);
  }
}
