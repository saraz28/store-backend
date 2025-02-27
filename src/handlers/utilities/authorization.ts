import { NextFunction, Request, Response } from "express";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization || "";
    const token = authorizationHeader.split(" ")[1];

    next();
  } catch (error) {
    res.status(401);
  }
};
export default verifyAuthToken;
