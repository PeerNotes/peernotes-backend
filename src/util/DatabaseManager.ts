import mongoose from "mongoose";
import User from "../models/User";
import Note from "../models/Note";
import List from "../models/List";
import Image from "../models/Image";

export default class DatabaseManager {
    private _db: any;
    public user: typeof User;
    public list: typeof List;
    public note: typeof Note;
    public image: typeof Image;

    constructor(databaseURI: any) {
        console.log(databaseURI);
        mongoose.connect(databaseURI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        this._db = mongoose.connection;
        this.user = User;
        this.note = Note;
        this.list = List;
        this.image = Image;
    }
    get db() {
        return this._db;
    }
}
