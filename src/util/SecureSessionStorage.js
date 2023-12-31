import CryptoJS from 'crypto-js';

export class SecureSessionStorage {

    static secretKey = "=86?234abHJ45ALDE26<-q!xHGkGK.3yD|BxaA!tQddha";

    static enc (data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    }

    static dec (data) {
        return JSON.parse(CryptoJS.AES.decrypt(data, this.secretKey).toString(CryptoJS.enc.Utf8));
    }

    static setItem (key, value) {
        sessionStorage.setItem(btoa(key), this.enc(value));
    }

    static removeItem (key) {
        sessionStorage.removeItem(btoa(key));
    }

    static getItem (key) {
        const val = sessionStorage.getItem(btoa(key));
        return val ? this.dec(val) : null;
    }
    
}