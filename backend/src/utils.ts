import jwt from 'jsonwebtoken';

export function getUserIdFromToken(token: string) {
  const decodedToken = jwt.verify(token, 'secret') as { userId: number };
  return decodedToken.userId;
}