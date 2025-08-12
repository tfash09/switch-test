import CryptoJS from "crypto-js";

// in a real application, this won't be left here
const encryptionKey = "YbQ9nOW9HfX6Rf4GVb9r1WmEtacEpTxoKo7aPMzN0Gc=";

export const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, encryptionKey).toString();
};

export const decrypt = (ciphertext: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return null;
  }
};
