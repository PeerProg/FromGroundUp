import jwt from 'jsonwebtoken';

const secretOrPrivateKey = process.env.REACT_APP_SECRET;

export default (token) => {
  return jwt.verify(token, secretOrPrivateKey, (error, decoded) => {
    if (error) return false;
    if(Object.keys(decoded).length !== 7) return false;
    return true;
  });
}
