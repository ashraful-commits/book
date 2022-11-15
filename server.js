import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import exprssLayouts from 'express-ejs-layouts';
import { MongoDBcon } from './config/mongodbcon.js';
import { router } from './routes/pageRoute.js';
import { localVarMiddleware } from './middlewares/localMiddlewares.js';
//=================================> config
dotenv.config();
//==================================> crate port
const port = process.env.PORT || 5000;
//====================================> create app
const app = express();

//=====================================> use app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//=====================================> use session
app.use(
  session({
    secret: 'Nothing',
    saveUninitialized: true,
    resave: false,
  })
);
app.use(localVarMiddleware);
app.use(cookieParser());
//=======================================> set and use ejs
app.set('view engine', 'ejs');
app.use(exprssLayouts);
app.set('layout', 'layouts/app');
//=========================================> public static
app.use(express.static('public'));
//===================================router use
app.use(router);

//==========================================> craete server
app.listen(port, () => {
  MongoDBcon();
  console.log(`Server is running on port ${port}`.bgMagenta);
});
