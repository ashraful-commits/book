import jwt from 'jsonwebtoken';

//=============================== token verify
export const tokenVerify = (token) => {
  const checkToken = jwt.verify(token, process.env.JWT_SECRECT);
  return checkToken;
};
