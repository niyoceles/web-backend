import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dontenv from 'dotenv';

dontenv.config();

class Auth {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static generateToken(id, email, names, userType) {
    const token = jwt.sign({
      id,
      email,
      names,
      userType
    },
    process.env.JWT_SECRET_KEY, {
      expiresIn: '24h'
    });
    return token;
  }

  static decodeToken(token) {
    let payload = '';
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      payload = decoded;
    });
    return payload;
  }
}

export default Auth;
