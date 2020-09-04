import { Router } from "express";
import { UserSignUp } from "../controllers/UserController";
import PersonalUserController from "../controllers/PersonalUserController";
import { body } from "express-validator";
import RouteValidator from "../util/RouteValidator";
import BadRequest from "../responses/BadRequest";
const users = new Router();

//users.post("/signin", UserSignIn);
users.post(
    "/signup",
    [
        RouteValidator(
            body("email")
                .isEmail()
                .normalizeEmail()
                .custom(async (value, { req }) => {
                    if (await req.app.database.users.findOne({ email: value })) {
                        throw new Error("An account with that email exists already!");
                    }
                    return;
                }),
            body("first_name").notEmpty().isString().trim().escape(),
            body("last_name").notEmpty().isString().trim().escape(),
            body("display_name")
                .notEmpty()
                .isString()
                .trim()
                .escape()
                .custom(async (value, { req }) => {
                    if (await req.app.database.users.findOne({ displayName: value })) {
                        throw new Error("An account with that display name already exists.");
                    }
                }),
            body("username")
                .notEmpty()
                .isString()
                .trim()
                .escape()
                .custom(async (value, { req }) => {
                    if (await req.app.database.users.findOne({ displayName: value })) {
                        throw new Error("An account with that display name already exists.");
                    }
                }),
            body("account_type").custom((value) => {
                if (!["local"].includes(value)) {
                    throw new BadRequest("account_type", value, "Invalid Account Type");
                }
            }),
            body("password").notEmpty().isString().trim().escape(),
            body("confirm_password")
                .notEmpty()
                .isString()
                .trim()
                .escape()
                .custom((value, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error("Password confirmation does not match password");
                    }
                })
        ),
    ],
    UserSignUp
);

users.use("/@me", PersonalUserController);

export default users;
