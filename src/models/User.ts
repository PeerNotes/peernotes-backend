import { Schema, model } from "mongoose";
import { IdUtil } from "../util/StructureUtil";

const User = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        immutable: true,
    },
    nanoid: {
        type: String,
        default: async () => {
            return await IdUtil.create();
        },
        immutable: true,
    },
    username: {
        type: String,
        minlength: 1,
        unique: true,
        immutable: true,
    },
    displayName: {
        type: String,
        minlength: 1,
        unique: true,
    },
    firstName: {
        type: String,
        minlength: 1,
        immutable: true,
    },
    lastName: {
        type: String,
        minlength: 1,
        immutable: true,
    },
    oAuth: {
        code: String,
    },
    notes: Map,
    bio: {
        type: String,
        default: null,
    },
    createdDate: {
        type: Date,
        immutable: true,
        default: new Date(),
    },
});

User.virtual("name").get((x) => {
    return `${x.first_name} ${x.last_name}`;
});

User.virtual("isOAuth").get((x) => {
    return x.oauth && typeof x.oauth.code === "string";
});

User.virtual("initials").get((x) => {
    return `${x.first_name.charAt(0)}${x.last_name.charAt(0)}`;
});

User.methods.toSafeObject = function () {
    return new SafeUser(this);
};

class SafeUser {
    public email: string;
    public nanoid: string;
    public username: string;
    public displayName: string;
    public firstName: string;
    public lastName: string;
    public oauth: string;
    public bio: string;
    public createdDate: Date;
    public notes: Map<string, Record<string, string>>;

    constructor(data) {
        this.email = data.email;
        this.nanoid = data.email;
        this.username = data.username;
        this.displayName = data.displayName;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.oauth = data.oauth;
        this.bio = data.bio;
        this.createdDate = data.createdDate;
        this.notes = new Map();
        for (const note of data.notes) {
            this.notes.set(note.id, note);
        }
    }
}

export default model("User", User);
export { SafeUser };
