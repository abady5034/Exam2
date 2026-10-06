import { env } from "../../config/env.service.js";

export const ErrorResponse = ({
  satus = 400,
  message = "Something went wrong",
  extra = undefined,
} = {}) => {
  throw new Error(message, { cause: { satus, extra } });
};

export const BadRequestException = ({
  message = "Bad Request",
  extra = undefined,
} = {}) => {
  return ErrorResponse({ status: 400, message, extra });
};

export const NotFoundException = ({
  message = "Not Found Error",
  extra = undefined,
} = {}) => {
  return ErrorResponse({ status: 404, message, extra });
};

export const ConflictException = ({
  message = "Conflict Error",
  extra = undefined,
} = {}) => {
  return ErrorResponse({ status: 409, message, extra });
};

export const UnAuthorizedException = ({
  message = "UnAuthorized Error",
  extra = undefined,
} = {}) => {
  return ErrorResponse({ status: 401, message, extra });
};

export const ForbiddenException = ({
  message = "Forbidden Error",
  extra = undefined,
} = {}) => {
  return ErrorResponse({ status: 403, message, extra });
};

export const globalHandlingError = (err, req, res, next) => {
  const mood = env.mood === "dev";
  const status = err.status ? err.status : err.cause ? err.cause.status : 500;
  const defaultMessage = "something went wrong";
  const displayErrorMessage = err.message || defaultMessage;
  res.status(status).json({
    stack: mood ? err.stack : null,
    message: mood ? displayErrorMessage : defaultMessage,
    extra: mood ? err.cause : null,
  });
};
