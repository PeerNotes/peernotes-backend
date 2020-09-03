import { nanoid } from "nanoid/async";
import jwt from "jsonwebtoken";
import { promisify } from "util";
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

class IdUtil {
    constructor() {
        throw new Error("This class is not constructable and is only populated with static methods");
    }
    static create(): Promise<string> {
        return nanoid();
    }
}

class JWTUtil {
    private _key: string;
    constructor(key: string) {
        this._key = key;
    }
    async create(id: string): Promise<any> {
        return await sign(
            {
                id: id,
                exp: Math.floor(Date.now() / 1000) + 60 * 180,
            },
            this._key
        );
    }
    async decode(jwt: string): Promise<any> {
        return verify(jwt, this._key);
    }
}
export { IdUtil, JWTUtil };
