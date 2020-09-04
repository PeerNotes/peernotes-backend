import NotFound from "../responses/NotFound";
import { ResponseCodes } from "../responses/ResponseCodes";
import ListRetrieveResponse from "../interfaces/ListRetrieveResponse";
import ListUpdatedResponse from "../interfaces/ListUpdatedResponse";
import ListCreationResponse from "../interfaces/ListCreationResponse";
import ListDeletionResponse from "../interfaces/ListDeletionResponse";

async function RetrieveList(req, res, next) {
    req.data.list = req.data.list ? req.data.list : await req.app.database.lists.findOne({ nanoid: req.params.nanoid });

    if (!req.data.list) return next(new NotFound("list to retrieve was not found."));

    const response: ListRetrieveResponse = {
        error: false,
        list: req.data.list.toSafeObject(),
    };
    return res.status(ResponseCodes.OK).json(response);
}

async function DeleteList(req, res, next) {
    if (!req.data.list) return next(new NotFound("list to delete was not found."));
    try {
        await req.app.database.list.findByIdAndDelete({ _id: req.data.list._id });

        const response: ListDeletionResponse = {
            error: false,
            message: "List queued for Deletion.",
        };
        return res.status(ResponseCodes.ACCEPTED).json(response);
    } catch (e) {
        return next(e);
    }
}

async function UpdateList(req, res, next) {
    req.data.list = req.data.list ? req.data.list : await req.app.database.list.findOne({ nanoid: req.params.nanoid });

    if (!req.data.list) return next(new NotFound("list to update was not found."));

    if (req.body.name) req.data.list.name = req.body.name;
    if (req.body.description) req.data.list.description = req.body.description;
    try {
        const NewList = await req.data.list.save();
        const response: ListUpdatedResponse = {
            error: false,
            list: NewList.toSafeObject(),
        };
        return res.status(ResponseCodes.OK).json(response);
    } catch (e) {
        return next(e);
    }
}

async function CreateList(req, res, next) {
    const { name, description } = req.body;
    try {
        const Templist = new req.app.database.list({
            name: name,
            description: description,
            author: {
                id: "test",
                username: "test1",
            },
        });

        const Createdlist = await Templist.save();

        const response: ListCreationResponse = {
            error: false,
            list: Createdlist.toSafeObject(),
        };
        return res.status(ResponseCodes.CREATED).json(response);
    } catch (e) {
        return next(e);
    }
}

export { RetrieveList, DeleteList, UpdateList, CreateList };
