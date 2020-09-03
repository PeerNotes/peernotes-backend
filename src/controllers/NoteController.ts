import NoteResponseInterface from "../interfaces/NoteResponse";
import NoteDeletionResponse from "../interfaces/NoteDeletionResponse";
import NoteUpdateResponse from "../interfaces/NoteUpdatedResponse";

async function RetriveNote(req, res) {
    req.data.note = req.data.note ? req.data.note : await req.app.database.notes.findOne({ nanoid: req.params.nanoid });

    const response: NoteResponseInterface = {
        error: false,
        note: req.data.note,
    };
    return res.status(200).json(response);
}

async function DeleteNote(req, res) {
    req.app.database.notes.deleteOne({ nanoid: req.data.note._id });

    const response: NoteDeletionResponse = {
        error: false,
        message: "Note Queued for Deletion.",
    };
    return res.status(202).json(response);
}

async function UpdateNote(req, res) {
    req.data.note = req.data.note ? req.data.note : await req.app.database.notes.findOne({ nanoid: req.params.nanoid });

    if (req.body.name) req.data.note.name = req.body.name;
    if (req.body.description) req.data.note.description = req.body.description;

    await req.data.note.save();
    const response: NoteUpdateResponse = {
        error: false,
        message: "Note Successfully Updated",
    };
    return res.status(200).json(response);
}

export { RetriveNote, DeleteNote, UpdateNote };
