export const localVarMiddleware = (req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  res.locals.user = req.session.user;
  res.locals.token = req.session.token;
  next();
};
