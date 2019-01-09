import { HTTP_STATUS, VALID_ORIGINS } from "./enums";

function validateOrigin(origin) {
  return VALID_ORIGINS.includes(origin) ? origin : VALID_ORIGINS[0];
}

function buildResponse(statusCode, origin, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": validateOrigin(origin)
    },
    body: JSON.stringify(body)
  };
}

export const success = ({ origin, body }) =>
  buildResponse(HTTP_STATUS.OK, origin, body);
export const failure = ({ origin, body }) =>
  buildResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, origin, body);
export const invalid = ({ origin, body }) =>
  buildResponse(HTTP_STATUS.BAD_REQUEST, origin, body);
