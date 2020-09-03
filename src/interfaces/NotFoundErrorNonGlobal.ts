export default interface NotFoundErrorNonGlobal {
    error: true;
    message: string;
    description: string | null;
    global: false;
}
