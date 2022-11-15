//============================= use modal
import { useModel } from '../models/userModels.js';
import { validator } from './validator.js';
export const isEmailExist = async (email) => {
  const findEmail = await useModel
    .findOne()
    .where('email')
    .equals(email);
  return findEmail;
};
