import NoteResponse from "../interfaces/NoteRetrieveResponse";
import NoteDeletionResponse from "../interfaces/NoteDeletionResponse";
import NoteUpdateResponse from "../interfaces/NoteUpdatedResponse";
import NotFound from "../responses/NotFound";
import { ResponseCodes } from "../responses/ResponseCodes";
import NoteCreationResponse from "../interfaces/NoteCreationResponse";

async function RetriveNote(req, res, next) {
    req.data.note = req.data.note ? req.data.note : await req.app.database.notes.findOne({ nanoid: req.params.nanoid });

    if (!req.data.note) return next(new NotFound("Note to retrieve was not found."));

    const response: NoteResponse = {
        error: false,
        note: req.data.note.toSafeObject(),
    };
    return res.status(ResponseCodes.OK).json(response);
}

async function DeleteNote(req, res, next) {
    if (!req.data.note) return next(new NotFound("Note to delete was not found."));

    try {
        req.app.database.notes.deleteOne({ nanoid: req.data.note._id });

        const response: NoteDeletionResponse = {
            error: false,
            message: "Note Queued for Deletion.",
        };
        return res.status(ResponseCodes.ACCEPTED).json(response);
    } catch (e) {
        return next(e);
    }
}

async function UpdateNote(req, res, next) {
    req.data.note = req.data.note ? req.data.note : await req.app.database.notes.findOne({ nanoid: req.params.nanoid });

    if (!req.data.note) return next(new NotFound("Note to update was not found."));

    if (req.body.name) req.data.note.name = req.body.name;
    if (req.body.description) req.data.note.description = req.body.description;
    try {
        const NewNote = await req.data.note.save();
        const response: NoteUpdateResponse = {
            error: false,
            note: NewNote.toSafeObject(),
        };
        return res.status(ResponseCodes.OK).json(response);
    } catch (e) {
        return next(e);
    }
}

async function CreateNote(req, res, next) {
    const { name, description } = req.body;
    try {
        const TempNote = new req.app.database.note({
            name: name,
            description: description,
            author: {
                id: "test",
                username: "test",
            },
        });

        const CreatedNote = await TempNote.save();

        const response: NoteCreationResponse = {
            error: false,
            note: CreatedNote.toSafeObject(),
        };
        return res.status(ResponseCodes.CREATED).json(response);
    } catch (e) {
        return next(e);
    }
}

export { RetriveNote, DeleteNote, UpdateNote, CreateNote };
