import { Schema, model } from "mongoose";
import { IdUtil } from "../util/StructureUtil";

const Note = new Schema({
    name: {
        type: String,
        required: true,
    },
    nanoid: {
        type: String,
        default: async () => {
            return await IdUtil.create();
        },
        immutable: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        immutable: true,
        default: new Date(),
    },
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
    images: Map,
});

Note.methods.toSafeObject = function () {
    return new SafeNote(this);
};

export default model("Note", Note);

class SafeNote {
    public name: string;
    public nanoid: string;
    public description: string;
    public createdDate: string | Date;
    public author: AuthorData;
    public images: Map<string, Record<string, string>>;

    constructor(data) {
        this.name = data.name;
        this.nanoid = data.nanoid;
        this.description = data.description;
        this.createdDate = new Date(data.createdDate);
        this.author = data.author;
        this.images = new Map();
        for (const image of data.images) {
            this.images.set(image.id, image);
        }
    }
}

interface AuthorData {
    id: string;
    displayName: string;
}

export { SafeNote };
