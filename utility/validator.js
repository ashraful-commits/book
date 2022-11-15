export const validator = (msg, redirect, req, res) => {
  req.session.message = msg;
  res.redirect(redirect);
};
