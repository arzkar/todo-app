import jwt from 'jsonwebtoken';

export function getUserIdFromToken(token: string) {
  try {
    const decodedToken = jwt.verify(token, 'secret') as { userId: number };
    return decodedToken.userId;
  }
  catch (error: any) {
    return
  }
}