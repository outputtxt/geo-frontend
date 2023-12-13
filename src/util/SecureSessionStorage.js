import SimpleCrypto from "simple-crypto-js";

export class SecureSessionStorage {

    private static CRYPTO = new SimpleCrypto("=86?234abHJ45ALDE26<-q!xHGkGK.3yD|BxaA!tQddha");

    static enc (data) {
        return this.CRYPTO.encrypt(data).toString();
    }

    static dec (data) {
        return this.CRYPTO.decrypt(data).toString();
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