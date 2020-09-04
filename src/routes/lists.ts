import { Router } from "express";
import { RetrieveList, DeleteList, UpdateList, CreateList } from "../controllers/ListController";
import NotFound from "../responses/NotFound";
const lists = new Router();

lists.use("/:nanoid", async (req, res, next) => {
    const List = await req.app.database.list.findOne({ nanoid: req.params.nanoid });
    if (!List) return next(new NotFound("A list with that ID was not Found"));
    req.data.list = List;
    return next();
});

lists.post("/", CreateList);
lists.route("/:nanoid").get(RetrieveList).delete(DeleteList).put(UpdateList);

export default lists;
