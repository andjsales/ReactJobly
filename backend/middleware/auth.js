"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");


/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}


/** Middleware to use when they be logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 */

function ensureAdmin(req, res, next) {
  try {
    if (!res.locals.user || !res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 *  If not, raises Unauthorized.
 */


// Ensure the user is the correct user or an admin
function ensureCorrectUserOrAdmin(req, res, next) {
  try {
    const user = res.locals.user;
    if (user && (user.username === req.params.username || user.isAdmin)) {
      return next();
    }
    throw new Error("Unauthorized");
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

// Function to add authorization headers in an API request
function addAuthHeader(headers = {}) {
  const token = localStorage.getItem("jobly-token"); // or use your method to retrieve the token
  return {
    ...headers,
    Authorization: `Bearer ${token}`
  };
}

// Example API request with axios
async function getUserData() {
  const headers = addAuthHeader();
  const response = await axios.get("http://localhost:3001/users/arupine", { headers });
  return response.data;
}


function logAuthHeader(req, res, next) {
  console.log("Authorization Header:", req.headers.authorization);
  next();
}


module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
  addAuthHeader,
  getUserData,
  logAuthHeader
};
