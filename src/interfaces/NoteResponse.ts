import { SafeNote } from "../models/Note";

export default interface NoteResponse {
    error: false;
    note: SafeNote;
}
