import { nanoid } from "nanoid/async";
import jwt from "jsonwebtoken";
import { promisify } from "util";
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);
const decode = promisify(jwt.decode);

class IdUtil {
    constructor() {
        throw new Error("This class is not constructable and is only populated with static methods");
    }
    static create() {
        return nanoid();
    }
}

class JWTUtil {
    constructor() {
        throw new Error("This class is not constructable and is only populated with static methods");
    }
    static async create(id: string, key: string) {
        return sign(
            {
                id: id,
                exp: Math.floor(Date.now() / 1000) + 60 * 180,
            },
            key,
        );
    }
    static verify(jwt: string, key: string) {
        return verify(jwt, key);
    }
    static deconstruct(jwt: string, key: string) {
        return JWTUtil.verify(jwt, key) ? decode(jwt, {}) : null;
    }
}
export { IdUtil, JWTUtil };
