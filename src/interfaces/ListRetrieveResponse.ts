import { SafeList } from "../models/List";

export default interface ListRetrieveResponse {
    error: false;
    list: SafeList;
}
