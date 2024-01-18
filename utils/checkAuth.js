import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mark2010";

export const checkAuth = (req, res, next) => {
  // const token = req.headers.authorization?.split("Bearer ")[1];
  const token = req.headers.authorization;


  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      req.userId = decoded._id;
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({
        message: "Немає доступу",
      });
    }
  } else {
    return res.status(403).json({
      message: "Немає доступу",
    });
  }
};