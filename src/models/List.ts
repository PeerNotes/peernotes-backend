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

export default model("List", List);
