/* eslint-disable @typescript-eslint/no-var-requires */
const { tests } = require("./tests.json");

for (const test of tests) {
    try {
        console.log(`Running Test ${test.name}...\n`);
        require(`./${test.path}`);
        console.log("\x1b[32m", `[✅] Test ${test.name} succeeded.\n`, "\x1b[0m");
    } catch (e) {
        console.log("\x1b[31m", `[❌] Test ${test.name} failed. Reason: ${e.message}\n`, "\x1b[0m");
    }
}
