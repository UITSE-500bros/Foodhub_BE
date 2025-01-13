import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
    customerId?: string; // Custom user identifier
}


const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
      return; // Ensure function exits after sending a response
    }

    const token = authHeader.split(' ')[1];

    // Replace 'process.env.SUPABASE_JWT_SECRET' with your actual secret key
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET) as JwtPayload;

    if (!decoded || !decoded.sub) {
      res.status(401).json({ message: 'Unauthorized: Invalid token payload' });
      return;
    }

    req.customerId = decoded.sub; // Attach the `sub` field to `req.customerId`
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
    return; // Ensure function exits after sending a response
  }
};
export default authMiddleware;