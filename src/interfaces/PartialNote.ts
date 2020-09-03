import PartialUser from "./PartialUser";

export default interface PartialNote {
    id: string;
    images: Map<string, string>;
    shortDescription: string;
    author: PartialUser;
}
