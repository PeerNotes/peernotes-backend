import NotFoundErrorNonGlobalInterface from "./NotFoundErrorNonGlobal";

export default interface NotFoundErrorGlobal {
    error: true;
    message: "That resource does not exist";
    global: true;
}
