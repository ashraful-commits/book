import bcrypt from 'bcryptjs';
//========================create hash

export const makeHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};
