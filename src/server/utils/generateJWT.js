import jwt from "jsonwebtoken";

const EXPIRATION_TIME = "1h";

export default (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: EXPIRATION_TIME });
