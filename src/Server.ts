import "@tsed/platform-express";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/objection";
import "@tsed/passport";

import * as api from "./controllers/api/index";
import * as pages from "./controllers/pages/index";

import {Configuration, Inject} from "@tsed/di";

import { Authentication } from "./models/Authentication";
import {PlatformApplication} from "@tsed/common";
import bodyParser from "body-parser";
import compress from "compression";
import {config} from "./config/index";
import cookieParser from "cookie-parser";
import cors from "cors";
import {join} from "path";
import knexfile from "./config/knexfile";
import methodOverride from "method-override";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  componentsScan: [
    './services/**/*.ts',
    './protocols/**/*.ts'
  ],
  mount: {
    "/api": [...Object.values(api)],
    "/": [...Object.values(pages)]
  },
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1"
    }
  ],
  middlewares: [
    cors(),
    cookieParser(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    })
  ],
  views: {
    root: join(process.cwd(), "./views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: [
    "**/*.spec.ts"
  ],
  passport: {
    userInfoModel: Authentication
  },
  jwt: {
    expiresIn: "1825d"
  },
  knex: knexfile[process.env.NODE_ENV as 'development' | 'production']
})
export class Server {
  @Inject()
  protected app!: PlatformApplication;

  @Configuration()
  protected settings!: Configuration;
}
