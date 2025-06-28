import jwt from "jsonwebtoken";
import bycrypt from 'bcrypt';

export const comparePasswords = (password, hash) => {
  return bycrypt.compare(password, hash)
}

export const hashPassword = (password) => {
  return bycrypt.hash(password,5)
}

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401);
    res.send("Not valid token");
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    res.status(401);
    res.send({ message: "Not valid token" });
    return;
  }
};
