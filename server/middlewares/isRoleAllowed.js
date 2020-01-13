function isRoleAllowed(req, res, next) {
  if(req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Not allowed');
  }
}

module.exports = isRoleAllowed;