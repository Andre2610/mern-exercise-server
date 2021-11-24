import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization.split(" ");
    const token = authHeaders[1];
    const isCustomAuth = authHeaders[1].length < 500;

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log("Error", error);
  }
};

export default auth;
