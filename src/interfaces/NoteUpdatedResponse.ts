import { SafeNote } from "../models/Note";

export default interface NoteUpdateResponse {
    error: false;
    note: SafeNote;
}
