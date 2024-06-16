// import { Strategy as Auth0Strategy } from "passport-auth0";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { ErrorRequestHandler } from "express";
import session from "express-session";
import bodyParser from "body-parser";
import routes from "./routes";
// import { appendJwt } from "./middleware";
import {
  // AUTH0_CALLBACK_URL,
  // AUTH0_CLIENT_ID,
  // AUTH0_CLIENT_SECRET,
  // AUTH0_DOMAIN,
  SESSION_SECRET
} from "./config";
import { STATUS_MESSAGE } from "./consts/statusCodes";

dotenv.config();

const app = express();
app.use(express.static(`${__dirname}/public`));
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Auth0
app.use(cookieParser());
app.use(
  session({
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

// passport.use(
//   new Auth0Strategy(
//     {
//       callbackURL: AUTH0_CALLBACK_URL,
//       clientID: AUTH0_CLIENT_ID,
//       clientSecret: AUTH0_CLIENT_SECRET,
//       domain: AUTH0_DOMAIN
//     },
//     (_accessToken, _refreshToken, _extraParams, profile, done) => {
//       // Remove unused parameters
//       done(null, profile);
//     }
//   )
// );

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(appendJwt);

// Serve the OpenAPI specification
// app.use("/api-docs", express.static(path.join(__dirname, "../openapi.yaml")));

// Install the OpenAPI validator
// app.use(
//   OpenApiValidator({
//     apiSpec: path.join(__dirname, "../openapi.yaml"),
//     validateRequests: true,
//     validateResponses: true,
//     fileUploader: true
//   })
// );

// Routes
app.use("/api/v1", routes);

// Error handler
const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Ok
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Ok
  next
) => {
  res.status(err.status ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: STATUS_MESSAGE.FAIL,
    errors: err.errors,
    message: err.message
  });
};
app.use(errorHandler);

export default app;
// ("Error: Unexpected end of form\n    at Multipart._final (/Users/lerka/Documents/ToyCycle/backend/node_modules/busboy/lib/types/multipart.js:588:17)\n    at callFinal (node:internal/streams/writable:757:12)\n    at prefinish (node:internal/streams/writable:769:7)\n    at finishMaybe (node:internal/streams/writable:779:5)\n    at Multipart.Writable.end (node:internal/streams/writable:687:5)\n    at onend (node:internal/streams/readable:756:10)\n    at processTicksAndRejections (node:internal/process/task_queues:77:11)");
