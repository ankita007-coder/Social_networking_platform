import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;
//console.log('token',token);
  // Check if the token is present
  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
    //console.log("decode",decoded);
    // Attach the user ID to the request object
    req.user = decoded

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Unauthorized - Token has expired' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Unauthorized - Invalid token' });
    }

    // For any other errors, return a generic unauthorized message
    return res.status(401).json({ msg: 'Unauthorized' });
  }
};

export default authMiddleware;
