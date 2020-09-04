import { SafeNote } from "../models/Note";

export default interface NoteRetrieveResponse {
    error: false;
    note: SafeNote;
}
