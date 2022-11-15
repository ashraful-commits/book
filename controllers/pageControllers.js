import { validator } from '../utility/validator.js';
import { useModel } from '../models/userModels.js';
import { makeHash } from '../utility/hash.js';
import { makeToken } from '../utility/token.js';
import { sendAMail } from '../utility/sendEmail.js';
import { isEmailExist } from '../utility/isEamilExist.js';
import { passwordComp } from '../utility/passCompare.js';
import { tokenVerify } from '../utility/tokenVerify.js';

//=============================================home page
export const homePage = (req, res) => {
  res.render('index');
};
//============================================= login page

export const loginpage = (req, res) => {
  res.render('login');
};
//============================================= signup page

export const signuppage = (req, res) => {
  res.render('signup');
};
//============================================= photo page

export const photopage = (req, res) => {
  res.render('photo');
};
//============================================= gallery page

export const gallerypage = (req, res) => {
  res.render('gallery');
};
//============================================= edit page
export const editpage = (req, res) => {
  const user = req.session.user;
  res.render('edit', {
    user: user,
  });
};
//============================================= passwoed page
export const passwordpage = (req, res) => {
  res.render('password');
};

//====================================================== action here /post/edit/change/
//===================================================== signup here
export const signupForm = async (req, res) => {
  try {
    const {
      name,
      email,
      username,
      password,
      cell,
      location,
      gender,
    } = req.body;

    if (
      !name ||
      !email ||
      !username ||
      !password ||
      !cell ||
      !location ||
      !gender
    ) {
      validator('All fields are reqired !', '/signup', req, res);
    } else {
      console.log(req.body);
      if (await isEmailExist(email)) {
        validator('Email alredy exist', '/signup', req, res);
      } else {
        const userData = await useModel.create({
          name,
          email,
          username,
          password: await makeHash(password),
          cell,
          location,
          gender,
        });
        const token = makeToken({ id: userData._id }, '3d');
        const link = `${process.env.APP_LINK}:${process.env.PORT}/active/${token}`;
        sendAMail(email, { name, cell, link });
        validator('Signup Successfull !', '/login', req, res);
      }
    }
  } catch (error) {
    validator(error.message, '/signup', req, res);
  }
};
//=========================================================== login form

export const loginForm = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      validator('All fields are required', '/login', req, res);
    } else {
      const isEmail = await isEmailExist(email);
      if (isEmail) {
        if (isEmail.isActive) {
          const passComp = passwordComp(password, isEmail.password);
          if (!passComp) {
            validator('Wrong Password', '/login', req, res);
          } else {
            const token = makeToken({ id: isEmail._id }, '3d');
            req.session.user = isEmail;
            res.cookie('authToken', token);
            validator('', '/photo', req, res);
            console.log(req.session.user);
          }
        } else {
          validator('Please active account!', '/login', req, res);
        }
      } else {
        validator('User not Exist!', '/login', req, res);
      }
    }
  } catch (error) {
    validator(error.message, '/login', req, res);
  }
};
//=============================================active account
export const activeAccount = async (req, res) => {
  try {
    const { token } = req.params;
    const checkToken = tokenVerify(token);
    if (!checkToken) {
      validator('Not Valid Token', '/login', req, res);
    } else {
      await useModel.findByIdAndUpdate(
        { _id: checkToken.id },
        {
          isActive: true,
        }
      );
      validator('Account Activeted !Login now', '/login', req, res);
    }
  } catch (error) {
    validator(error.message, '/login', req, res);
  }
};
//======================================================= logout
export const logoutAction = (req, res) => {
  res.clearCookie('authToken');
  delete req.session.user;
  validator('Logout successfully!', '/login', req, res);
};

export const uploadphotopage = async (req, res) => {
  try {
    const { photo } = req.body;
    const data = await req.session.user;
    await useModel.findByIdAndUpdate(data._id, {
      photo: req.file.filename,
    });
    req.session.user.photo = req.file.filename;
    req.session.user = data;
    validator(' Uploaded Photo!', '/', req, res);
  } catch (error) {
    validator(error.message, '/photo', req, res);
  }
};
//===========================================gallery upload
export const gallerypageUpload = async (req, res) => {
  try {
    for (let i = 0; i < req.files.length; i++) {
      await useModel.findByIdAndUpdate(req.session.user._id, {
        $push: {
          gallery: req.files[i].filename,
        },
      });
    }

    validator('Gallary upload successfull', '/gallery', req, res);
  } catch (error) {
    validator(error.message, '/gallery', req, res);
  }
};
//======================================passwrod change
export const passwordpageChange = async (req, res) => {
  try {
    const { old_pass, new_pass, confirm_pass } = req.body;
    if (!old_pass || !new_pass || !confirm_pass) {
      validator('All fields are Required', '/password', req, res);
    } else {
      console.log(req.body);
      if (new_pass == confirm_pass) {
        const user = req.session.user;
        const checkPass = passwordComp(old_pass, user.password);
        if (checkPass) {
          await useModel.findByIdAndUpdate(user._id, {
            password: await makeHash(new_pass),
          });
          res.clearCookie('authToken');
          validator('Upadated password', '/login', req, res);
        } else {
          validator('Not your password', '/password', req, res);
        }
      } else {
        validator(
          'new and Confirm pass not match',
          '/password',
          req,
          res
        );
      }
    }
  } catch (error) {
    validator(error.message, '/password', req, res);
  }
};
//========================================== editpagepost
export const editpagepost = async (req, res) => {
  try {
    const { name, email, username, cell, location, gender } =
      req.body;
    console.log(req.body);

    const user = req.session.user;

    const updata = await useModel.findByIdAndUpdate(user._id, {
      name,
      email,
      username,
      cell,
      location,
      gender,
    });
    res.clearCookie('authToken');
    req.session.user = updata;
    validator('updated Succesfull', '/login', req, res);
  } catch (error) {
    validator(error.message, '/edit', req, res);
  }
};
