import { expect } from "chai";
import Logger from "../src/util/Logger";
import { JWTUtil, IdUtil } from "../src/util/StructureUtil";

const JWTtestID = "thisisatestid";
const JWTtestKey = "thisisatestkey";

describe("Utilities", async () => {
    describe("IDGeneration", async () => {
        it("Generate ID", async () => {
            return expect(await IdUtil.create()).to.be.an("string");
        });
    });

    describe("JWTUtil", async () => {
        it("Generate JWT", async () => {
            const JWTClass = new JWTUtil(JWTtestKey);
            return expect(await JWTClass.create(JWTtestID)).to.be.an("string");
        });
        it("Deconstruct JWT", async () => {
            const JWTClass = new JWTUtil(JWTtestKey);
            const JWT = await JWTClass.create(JWTtestID);
            return expect((await JWTClass.decode(JWT)).id).to.be.equal(JWTtestID);
        });
    });

    describe("Logger", async () => {
        it("Info", async () => {
            return expect(Logger.log("Info Test")).to.be.an("string");
        });
        it("Warn", async () => {
            return expect(Logger.log("Warn Test")).to.be.an("string");
        });
        it("Error", async () => {
            return expect(Logger.log("Error Test")).to.be.an("string");
        });
    });
});
