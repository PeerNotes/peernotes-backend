import express from "express";
import config from "../config";
import Logger from "./util/Logger";
import DatabaseManager from "./util/DatabaseManager";

import bodyParser from "body-parser";
import compression from "compression";
import { version } from "../package.json";
import { JWTUtil } from "./util/StructureUtil";

const app = express();

app.details = {
    version: version,
};
app.utils = {
    JWTUtil: new JWTUtil(config.jwt_secure_token),
};

app.database = new DatabaseManager(config.database_uri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

const api = new express.Router();
api.use(async (req, res, next) => {
    req.data = {};
    return next();
});
import * as routes from "./routes/index";
for (const route in routes) {
    api.use(`/${route}`, routes[route]);
}
app.use(`/api/v${app.details.version.charAt(0)}`, api);

app.get("/", async (req, res) => {
    return res.json({
        error: false,
        message: `Welcome to Version ${req.app.details.version} of the PeerNotes API. To use most routes, you are required to provide a bearer auth-token in order to authenticate. For more questions, please go to our support website.`,
    });
});

import NotFound from "./responses/NotFound";
import BadRequest from "./responses/BadRequest";
import NotFoundErrorNonGlobal from "./interfaces/NotFoundErrorNonGlobal";
import NotFoundErrorGlobal from "./interfaces/NotFoundErrorGlobal";
import BadRequestError from "./interfaces/BadRequestError";
import { ResponseCodes } from "./responses/ResponseCodes";

app.use(async (err, req, res, next) => {
    if (process.env.NODE_ENV !== "production") console.log(err);

    switch (err.constructor) {
        case NotFound: {
            const response: NotFoundErrorNonGlobal = {
                error: true,
                message: "That resource does not exist",
                description: err.message ? err.message : null,
                global: false,
            };
            return res.status(ResponseCodes.NOTFOUND).json(response);
        }
        case BadRequest: {
            const response: BadRequestError = {
                error: true,
                message: "Bad Request.",
                field: err.field,
                value: err.value,
                description: err.description,
            };
            return res.status(ResponseCodes.BAD_REQUEST).json(response);
        }
        default: {
            const response = {
                error: true,
                message: "An Internal Server Error Occured.",
            };
            return res.status(ResponseCodes.INTERNAL).json(response);
        }
    }

    return next();
});

app.use("*", async (req, res) => {
    const response: NotFoundErrorGlobal = {
        error: true,
        message: "That resource does not exist",
        global: true,
    };
    return res.status(ResponseCodes.NOTFOUND).json(response);
});

app.listen(config.port, "0.0.0.0", async () => {
    Logger.log(`Server started on port ${config.port} at url: ${config.protocol}://${config.domain}:${config.port}`);
});
