import { Router } from "express";
import RouteValidator from "../util/RouteValidator";
import NotFound from "../responses/NotFound";
import { RetriveNote, DeleteNote, UpdateNote, CreateNote } from "../controllers/NoteController";
const notes = new Router();

notes.use("/:nanoid", async (req, res, next) => {
    const Note = await req.app.database.note.findOne({ nanoid: req.params.nanoid });
    if (!Note) return next(new NotFound("A Note with that ID was not Found"));
    req.data.note = Note;
    return next();
});

notes.post("/", CreateNote);
notes.route("/:nanoid").get(RetriveNote).delete(DeleteNote).put(UpdateNote);

export default notes;
