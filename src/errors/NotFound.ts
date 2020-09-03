export default class NotFound extends Error {
    public status: number;
    constructor(message) {
        super(message);
        this.status = 404;
    }
}
