import { SafeNote } from "../models/Note";

export default interface NoteCreationResponse {
    error: false;
    note: SafeNote;
}
