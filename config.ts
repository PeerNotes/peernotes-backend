import dotenv from "dotenv";
dotenv.config({
    path: `${__dirname}/.env`,
});
// eslint-disable-next-line prefer-const
let config: any = {};
const settings = [
    {
        name: "domain",
        required: true,
        description: "Please provide a domain that will point directly to this application",
    },
    {
        name: "port",
        required: true,
        description: "This is the port that the backend will run on",
    },
    {
        name: "protocol",
        required: false,
        default: "http",
    },
    {
        name: "jwt_secure_key",
        required: true,
    },
    {
        name: "database_uri",
        description: "The URI to connect to the mongodb database",
        required: true,
    },
];
settings.forEach((x) => {
    const extracted = process.env[x.name.toUpperCase()];
    if (!extracted && x.required)
        throw new Error(`The setting ${x.name} was not found. ${x.description ? x.description : ""}`);
    config[x.name] = extracted || x.default;
});
export default config;
