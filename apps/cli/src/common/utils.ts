export class Utils {
  static fromStringToBuffer(data: string): ArrayBuffer {
    return Buffer.from(data, "utf-8");
  }

  static fromBufferToString(data: ArrayBuffer): string {
    return Buffer.from(data).toString("utf-8");
  }

  static fromB64ToBuffer(data: string): ArrayBuffer {
    return Buffer.from(data, "base64");
  }

  static fromBufferToB64(data: ArrayBuffer): string {
    return Buffer.from(data).toString("base64");
  }
}
