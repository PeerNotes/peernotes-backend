import { Schema, model, Document } from "mongoose";
import { IdUtil } from "../util/StructureUtil";
import AuthorData from "../interfaces/AuthorData";

export interface INote extends Document {
    name: string;
    nanoid: string;
    description: string;
    createdDate: Date;
    author: AuthorData;
    images: Map<string, Record<string, string>>;
}

const Note = new Schema({
    name: {
        type: String,
        required: true,
    },
    nanoid: {
        type: String,
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

Note.pre<INote>("save", async function () {
    if (this.nanoid == null) {
        this.nanoid = await IdUtil.create();
    }
});

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
        if (data.images) {
            for (const image of data.images) {
                this.images.set(image.id, image);
            }
        }
    }
}

export { SafeNote };
