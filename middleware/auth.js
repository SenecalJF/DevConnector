const jwt = require('jsonwebtoken');
const config = require('config');

//exporting a middle function that has the request and the response available to it
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  //check if not token (if theres is not a token)

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token (if there is a token associated to the user)

  try {
    //decoded means to find what it inside the jwt token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    //then we can use that req.user in any of our protected routes and get the user profile
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
