import dotenv from "dotenv";
import {join} from "path";

export const isProduction = process.env.NODE_ENV === "production";

export const envs = {
  ...process.env,
  ...dotenv.config({path: join(process.cwd(), `${process.env.NODE_ENV}.env`)}).parsed
};
