import { validationResult } from "express-validator";
import BadRequest from "../responses/BadRequest";

export default function (...validations) {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const error = errors.mapped();
        return next(new BadRequest(error.param, error.value, error.msg));
    };
}
