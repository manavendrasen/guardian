export class Utils {
  static fromStringToBuffer(data: string): ArrayBuffer {
    // const arrayBuf = new Uint8Array(data.length);

    // for (let i = 0; i < data.length; i++) {
    //   arrayBuf[i] = data.charCodeAt(i);
    // }

    // return arrayBuf;

    const enc = new TextEncoder();
    return enc.encode(data);
  }

  static fromBufferToString(data: ArrayBuffer): string {
    // const arrayBuf = new Uint8Array(data);
    // let res = "";

    // for (let i = 0; i < arrayBuf.byteLength; i++) {
    //   res += String.fromCharCode(arrayBuf[i]);
    // }

    const dec = new TextDecoder();

    return dec.decode(data);
  }

  static fromB64ToBuffer(data: string): ArrayBuffer {
    return Utils.fromStringToBuffer(atob(data));
  }

  static fromBufferToB64(data: ArrayBuffer): string {
    return btoa(Utils.fromBufferToString(data));
  }
}
