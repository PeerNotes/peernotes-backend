import { Schema, model } from "mongoose";
import { IdUtil } from "../util/StructureUtil";

const List = new Schema({
    name: String,
    nanoid: {
        type: String,
        default: async () => {
            return await IdUtil.create();
        },
    },
    description: String,
    createdDate: Date,
    author: {
        id: String,
        displayName: String,
    },
    notes: Map,
});

List.methods.toSafeObject = function () {
    return new SafeList(this);
};

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
        for (const image of data.images) {
            this.notes.set(image.id, image);
        }
    }
}

interface AuthorData {
    id: string;
    displayName: string;
}

export default model("List", List);
export { SafeList };
