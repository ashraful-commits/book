import Jwt from 'jsonwebtoken';

//=======================create token

export const makeToken = (preload, exp = '1d') => {
  const token = Jwt.sign(preload, process.env.JWT_SECRECT, {
    expiresIn: exp,
  });
  return token;
};
