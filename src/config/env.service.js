import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("./.env") });

const port = process.env.PORT;
const databaseURI = process.env.DATABASE_URI;
const salt = Number(process.env.SALT);
const secretKeyAccess = process.env.SECRET_KEY_ACCESS
const secretKeyRefresh = process.env.SECRET_KEY_REFRESH

export const env = { port, databaseURI, salt, secretKeyAccess, secretKeyRefresh };
