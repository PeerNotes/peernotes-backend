import colors from "./colors";

class Logger {
    constructor() {
        throw new Error("This class is not constructable and is only populated with static methods");
    }
    static base(type: string, value: string, color: string) {
        console.log(
            color,
            `[${new Date().toLocaleTimeString()}|${new Date().toLocaleDateString()}] [PEERNOTES] [${type}] ${value}`,
            colors.RESET
        );
        return `[${new Date().toLocaleTimeString()}|${new Date().toLocaleDateString()}] [PEERNOTES] [${type}] ${value}`;
    }
    static log(value: string) {
        return Logger.base("INFO", value, colors.GREEN);
    }
    static warn(value: string) {
        return Logger.base("WARN", value, colors.YELLOW);
    }
    static error(value: string) {
        return Logger.base("ERR", value, colors.RED);
    }
}

export default Logger;
