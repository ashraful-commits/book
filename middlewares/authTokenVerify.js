import { validator } from '../utility/validator.js';

export const authTokenVerify = (req, res, next) => {
  const token = req.cookies.authToken;
  if (token) {
    validator('', '/', req, res);
  } else {
    next();
  }
};
