import * as cookie from "cookie";
import session from "models/session";
import {
  InternalServerError,
  MethodNotAllowedError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
} from "infra/errors";
import user from "models/user";

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandler(error, request, response) {
  if (
    error instanceof ValidationError ||
    error instanceof NotFoundError ||
    error instanceof ForbiddenError
  ) {
    return response.status(error.statusCode).json(error);
  }

  if (error instanceof UnauthorizedError) {
    clearSessionCookie(response);
    return response.status(error.statusCode).json(error);
  }

  const publicErrorObject = new InternalServerError({
    cause: error,
  });

  console.error(publicErrorObject);

  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

async function setSessionCookie(sessionToken, response) {
  const setCookie = cookie.serialize("session_id", sessionToken, {
    path: "/",
    maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  });

  response.setHeader("Set-Cookie", setCookie);
}

async function clearSessionCookie(response) {
  const setCookie = cookie.serialize("session_id", "invalid", {
    path: "/",
    maxAge: -1,
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  });

  response.setHeader("Set-Cookie", setCookie);
}

async function injectAnonymousOrAuthenticatedUser(request, response, next) {
  if (request.cookies?.session_id) {
    await injectAuthenticatedUser(request);
  } else {
    injectAnonymousUser(request);
  }

  return next();

  async function injectAuthenticatedUser(request) {
    const sessionToken = request.cookies.session_id;
    const sessionObject = await session.findOneValidByToken(sessionToken);

    const userObject = await user.findOneById(sessionObject.user_id);

    request.context = {
      ...request.context,
      user: userObject,
    };
  }

  function injectAnonymousUser(request) {
    const anonymousUserObject = {
      features: ["read:activation_token", "create:session", "create:user"],
    };

    request.context = {
      ...request.context,
      user: anonymousUserObject,
    };
  }
}

function canRequest(requiredFeature) {
  return (request, response, next) => {
    const userFeatures = request.context.user.features;
    if (userFeatures.includes(requiredFeature)) {
      return next();
    }

    throw new ForbiddenError({
      message: "Você não possui permissão para realizar esta ação.",
      action: `Verifique se o seu usuário possui a feature "${requiredFeature}"`,
    });
  };
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
  setSessionCookie,
  clearSessionCookie,
  injectAnonymousOrAuthenticatedUser,
  canRequest,
};

export default controller;
