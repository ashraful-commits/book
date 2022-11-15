import express from 'express';
import { authTokenVerify } from '../middlewares/authTokenVerify.js';
import { loginUserRedicet } from '../middlewares/pageRedirectAut.js';
import {
  homePage,
  loginpage,
  signuppage,
  photopage,
  gallerypage,
  editpage,
  passwordpage,
  signupForm,
  loginForm,
  activeAccount,
  logoutAction,
  uploadphotopage,
  gallerypageUpload,
  passwordpageChange,
  editpagepost,
} from '../controllers/pageControllers.js';
import { photoMulter } from '../middlewares/multer.js';
import { galleryPhoto } from '../middlewares/multer.js';
//=====================create rouer
export const router = express.Router();

/**
 * cover page
 *  */

router.get('/', authTokenVerify, homePage);
router.get('/login', loginpage);
router.post('/login', loginForm);
router.get('/signup', signuppage);
router.post('/signup', signupForm);
router.get('/photo', photopage);
router.post('/photo', photoMulter, uploadphotopage);
router.get('/gallery', gallerypage);
router.post('/gallery', galleryPhoto, gallerypageUpload);
router.get('/edit', editpage);
router.post('/edit', editpagepost);
router.get('/password', passwordpage);
router.post('/password', passwordpageChange);
router.get('/active/:token', activeAccount);
router.get('/logout', logoutAction);
