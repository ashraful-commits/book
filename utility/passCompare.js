import bcrypt from 'bcryptjs';
//========================================password compare
export const passwordComp = (password, compass) => {
  const passcomp = bcrypt.compareSync(password, compass);
  return passcomp;
};
