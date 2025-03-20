import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
function extractUserDataFromToken(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("Authorization header is missing");
  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Token is missing");
  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET! || ''); // Use your JWT secret
    return {
      userId: decodedToken.id,
      email: decodedToken.email,
      isAdmin:decodedToken.isAdmin
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
}
export default extractUserDataFromToken