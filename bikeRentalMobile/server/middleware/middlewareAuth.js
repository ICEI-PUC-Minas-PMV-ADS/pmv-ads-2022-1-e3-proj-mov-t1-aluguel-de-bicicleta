import jwt from "jsonwebtoken";
import secretString from "./constants.js";

const middlewareAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, secretString);
      if (decodedData) {
        req.userId = decodedData.id;
      }
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default middlewareAuth;
