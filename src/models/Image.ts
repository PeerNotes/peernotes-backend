import { Schema, model } from "mongoose";
import { IdUtil } from "../util/StructureUtil";

const Image = new Schema({
    name: String,
    nanoid: {
        type: String,
        default: async () => {
            return await IdUtil.create();
        },
    },
    note: String,
    hash: String,
});

export default model("Image", Image);
