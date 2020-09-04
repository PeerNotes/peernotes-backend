import { SafeList } from "../models/List";

export default interface ListCreationResponse {
    error: false;
    list: SafeList;
}
