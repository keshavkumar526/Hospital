 import jwt from "jsonwebtoken";
import { SECRETS } from "./config.js";

export const newToken = (user) => {
  return jwt.sign({ id: user._id }, SECRETS.jwt, {
    expiresIn: SECRETS.jwtExp,
  });
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, SECRETS.jwt, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
const clientProtect = async (req, res, next) => {
  const Model = req.model;
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  let auth = req.headers.authorization
  let token = auth.split("Bearer ")[1];
  if (!token) {
    return res.status(401).end();
  }
  try {
    const payload = await verifyToken(token);
    const user = await Model.findById(payload.id)
      .populate({ path: "subjects", select: "-addedBy -__v" })
      .populate({ path: "languages", select: "name" })
      .select("-password -identities")
      .lean()
      .exec();
    req.user = user;
    next();
  } catch (e) {
    console.log("error", e.message);
    return res.status(401).end();
  }
};