const jwt = require('jsonwebtoken');
class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

class NotFoundError extends CustomError {
  constructor(entity) {
    super(`${entity}을(를) 찾을 수 없습니다.`, 404);
    this.entity = entity;
  }
}

class AuthError extends CustomError {
  constructor() {
    super('권한이 없습니다.', 401);
  }
}

class DuplicateError extends CustomError {
  constructor(property) {
    super(`이미 사용중인 ${property} 입니다.`, 403);
    this.property = property;
  }
}
const errorHandler = (err, req, res, next) => {
  let statusCode;

  if (
    err instanceof NotFoundError ||
    err instanceof AuthError ||
    err instanceof DuplicateError ||
    err instanceof jwt.JsonWebTokenError
  ) {
    statusCode = err.status;
  } else {
    statusCode = err.status || 500;
  }

  if (statusCode >= 400 && statusCode < 500) {
    res
      .status(statusCode)
      .send(`클라이언트 오류가 발생했습니다. [ERROR]:\n${err.message}`);
  } else if (statusCode >= 500 && statusCode < 600) {
    res
      .status(statusCode)
      .send(`서버 오류가 발생했습니다. [ERROR]:\n${err.message}`);
  } else {
    res
      .status(statusCode)
      .send(`에러가 발생했습니다. 관리자에게 문의해주세요. [ERROR]:\n${err}`);
  }
};

module.exports = { errorHandler, NotFoundError, AuthError, DuplicateError };
