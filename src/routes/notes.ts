import { Router } from "express";
import RouteValidator from "../util/RouteValidator";
import NotFound from "../errors/NotFound";
import { RetriveNote, DeleteNote } from "../controllers/NoteController";
const notes = new Router();

notes.use("/:nanoid", async (req, res, next) => {
    const Note = await req.app.database.notes.findOne({ nanoid: req.params.nanoid });
    if (!Note) return next(new NotFound("A Note with that ID was not Found"));
    req.data.note = Note;
    return next();
});

notes.route("/:nanoid").get(RetriveNote).delete(DeleteNote);

export default notes;
