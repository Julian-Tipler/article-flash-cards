import { CORSResponse } from "./cors.ts";

export const enum ErrorCodes {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const ERRORS_MAPPING = {
  [ErrorCodes.BAD_REQUEST]: "Bad Request.",
  [ErrorCodes.NOT_FOUND]: "Not Found.",
  [ErrorCodes.SERVER_ERROR]: "Internal Server Error.",
};

export const apiError = (code: ErrorCodes, err?: Record<string, unknown>) =>
  new CORSResponse(
    JSON.stringify(err ? err : { error: ERRORS_MAPPING[code] }),
    {
      status: code,
    },
  );

export const enum ErrorTypes {
  INAPPROPRIATE_CONTENT = "INAPPROPRIATE_CONTENT",
  NO_RESPONSE_POPULATED = "NO_RESPONSE_POPULATED",
}
