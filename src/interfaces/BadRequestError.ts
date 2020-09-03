export default interface BadRequestError {
    error: true;
    message: "Bad Request.";
    field: string;
    value: string;
    description: string;
}
