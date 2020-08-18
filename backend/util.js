const jwt = require("jsonwebtoken");
const { envVar } = require("./config");

// Generating token based on user as payload

const getToken = (user) => {
  return jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    envVar.JWT_PrivateKey
  );
};

//Authorization logic

function auth(req, res, next) {
  const token = req.headers("x-auth-token");

  if (!token) {
    res.status(401).send("Access denied, no token provided");
    return;
  }

  try {
    const decodedPayload = jwt.verify(token, envVar.JWT_PrivateKey);
    req.user = decodedPayload; // setting the user after decoding payload
    next();
  } catch (error) {
    res.status(400).send(error.message, "Invalid token");
  }
}

//Is the user logged in Admin or not logic

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
    return;
  }

  return res.status(401).send("User is not authenticated to access");
}

module.exports.getToken = getToken;
module.exports.auth = auth;
module.exports.isAdmin = isAdmin;
