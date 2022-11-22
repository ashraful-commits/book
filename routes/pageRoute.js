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
  profilePage,
  friendsPage,
  followPage,
  unfollowPage,
  showProfilePage,
  followingPage,
  followersPage,
} from '../controllers/pageControllers.js';
import { photoMulter } from '../middlewares/multer.js';
import { galleryPhoto } from '../middlewares/multer.js';
//=====================create rouer
export const router = express.Router();

/**
 * cover page
 *  */

router.get('/', loginUserRedicet, homePage);
router.get('/login', authTokenVerify, loginpage);
router.post('/login', loginForm);
router.get('/signup', authTokenVerify, signuppage);
router.post('/signup', signupForm);
router.get('/photo', loginUserRedicet, photopage);
router.post('/photo', photoMulter, uploadphotopage);
router.get('/gallery', loginUserRedicet, gallerypage);
router.post('/gallery', galleryPhoto, gallerypageUpload);
router.get('/edit', loginUserRedicet, editpage);
router.post('/edit', loginUserRedicet, editpagepost);
router.get('/password', loginUserRedicet, passwordpage);
router.post('/password', passwordpageChange);
router.get('/active/:token', activeAccount);
router.get('/logout', logoutAction);
router.get('/profile', loginUserRedicet, profilePage);
router.get('/profile/:id', loginUserRedicet, showProfilePage);
router.get('/friends', loginUserRedicet, friendsPage);
router.get('/follow/:id', loginUserRedicet, followPage);
router.get('/unfollow/:id', loginUserRedicet, unfollowPage);
router.get('/following/:id', loginUserRedicet, followingPage);
router.get('/followers/:id', loginUserRedicet, followersPage);
