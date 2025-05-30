import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  if (!req.body) req.body = {};
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Authorization denied, please login again.",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export default authMiddleware;
