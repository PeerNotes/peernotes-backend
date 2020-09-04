import UserSignUpResponseInterface from "../interfaces/UserSignUpResponse";
import { ResponseCodes } from "../responses/ResponseCodes";

//async function UserSignIn(req, res) {}

async function UserSignUp(req, res, next) {
    try {
        const { accountType } = req.body;
        const TempUser = new req.app.database.user({});
        const accessToken = req.app.utils.JWTUtil.create((await TempUser.save()).id);

        const response: UserSignUpResponseInterface = {
            error: false,
            accessToken: accessToken,
        };
        return res.status(ResponseCodes.CREATED).json(response);
    } catch (e) {
        return next(e);
    }
}

export { /*UserSignIn,*/ UserSignUp };
