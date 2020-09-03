export default class BadRequest extends Error {
    public field: string | null;
    public value: string | number | null;
    public description: string | null;
    location?: string;
    constructor(field, value, description, location?) {
        super(`[${field}] ${description}`);
        this.field = field;
        this.value = value;
        this.description = description;
        this.location = location;
    }
}
