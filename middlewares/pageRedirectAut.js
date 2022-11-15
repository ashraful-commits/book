import { validator } from '../utility/validator.js';
import jwt from 'jsonwebtoken';
import { useModel } from '../models/userModels.js';

export const loginUserRedicet = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (token) {
      const tokenCheck = jwt.verify(token, process.env.JWT_SECRECT);
      if (tokenCheck) {
        const validData = await useModel.findById({
          _id: tokenCheck.id,
        });
        if (validData) {
          next();
        } else {
          delete req.session.user;
          res.clearCookie('authToken');
          validator('Registration Please!', '/login', req, res);
        }
      }
    } else {
      delete req.session.user;
      res.clearCookie('authToken');
      validator('Please login !', '/login', req, res);
    }
  } catch (error) {
    delete req.session.user;
    res.clearCookie('authToken');
    validator('Invalid token', '/login', req, res);
  }
};
