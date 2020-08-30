import mongoose from "mongoose";

export default class DatabaseManager {
    private _db: any;

    constructor(databaseURI: any) {
        mongoose.connect(databaseURI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        this._db = mongoose.connection;
    }
    get db() {
        return this._db;
    }
}
