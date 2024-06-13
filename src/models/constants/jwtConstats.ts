require('dotenv').config();

export const jwtConstants = () => {
  const secret = process.env.JWT_SECRET;
};
