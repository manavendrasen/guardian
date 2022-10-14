export class Utils {
  static global = typeof window !== undefined ? window : global;

  static fromStringToBuffer(data: string): ArrayBuffer {
    const arrayBuf = new Uint8Array(data.length);

    for (let i = 0; i < data.length; i++) {
      arrayBuf[i] = data.charCodeAt(i);
    }

    return arrayBuf;
  }

  static fromBufferToString(data: ArrayBuffer): string {
    const arrayBuf = new Uint8Array(data);
    let res = "";

    for (let i = 0; i < arrayBuf.byteLength; i++) {
      res += String.fromCharCode(arrayBuf[i]);
    }

    return res;
  }

  static fromB64ToBuffer(data: string): ArrayBuffer {
    return Utils.fromStringToBuffer(Utils.global.atob(data));
  }

  static fromBufferToB64(data: ArrayBuffer): string {
    return Utils.global.btoa(Utils.fromBufferToString(data));
  }
}
