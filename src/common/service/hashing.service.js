import bcrypt from "bcrypt";
import { env } from "../../config/env.service.js";

export const generateHash = async ({ plainText }) => {
  let hashed = await bcrypt.hash(plainText, env.salt);
  return hashed;
};

export const compareHash = async ({ plainText, hashedText }) => {
  let isCompared = await bcrypt.compare(plainText, hashedText);
  return isCompared;
};
