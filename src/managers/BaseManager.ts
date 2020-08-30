import DatabaseManager from "./DatabaseManager";

export default class BaseManager {
    constructor(public parentManager: DatabaseManager, public holds: string, public model: any) { }
    get(id: string) {
        return this.model.findById(id);
    }
    delete(id: string) {
        return this.model.findByIdAndDelete(id);
    }
    all() {
        return this.model.find({});
    }
}
