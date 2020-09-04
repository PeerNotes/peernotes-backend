import { Schema, model, Document } from "mongoose";
import { IdUtil } from "../util/StructureUtil";
import AuthorData from "../interfaces/AuthorData";

export interface IList extends Document {
    name: string;
    nanoid: string;
    description: string;
    createdDate: Date;
    author: string;
    images: Map<string, Record<string, string>>;
}

const List = new Schema({
    name: String,
    nanoid: {
        type: String,
    },
    description: String,
    createdDate: Date,
    author: {
        id: {
            type: String,
            immutable: true,
            required: true,
        },
        username: {
            type: String,
            immutable: true,
            required: true,
        },
    },
    notes: Map,
});

List.methods.toSafeObject = function () {
    return new SafeList(this);
};

List.pre<IList>("save", async function () {
    if (this.nanoid == null) {
        this.nanoid = await IdUtil.create();
    }
});

class SafeList {
    public name: string;
    public nanoid: string;
    public description: string;
    public createdDate: string | Date;
    public author: AuthorData;
    public notes: Map<string, Record<string, string>>;

    constructor(data) {
        this.name = data.name;
        this.nanoid = data.nanoid;
        this.description = data.description;
        this.createdDate = new Date(data.createdDate);
        this.author = data.author;
        this.notes = new Map();
        if (data.notes) {
            for (const note of data.notes) {
                this.notes.set(note.id, note);
            }
        }
    }
}

export default model("List", List);
export { SafeList };
