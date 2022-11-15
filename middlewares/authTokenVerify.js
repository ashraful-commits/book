import { validator } from '../utility/validator.js';

export const authTokenVerify = (req, res, next) => {
  const token = req.cookies.authToken;
  if (token) {
    next();
  }
};
