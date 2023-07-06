import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes"

const createJwt = (payload: string): string => {
  const token = jwt.sign({ userId: payload }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ( token   :string) => jwt.verify(token, process.env.JWT_SECRET!);

// const attachCookiesToResponse = ({ res, user }) => {
//   const token = createJwt({ payload: user });
//   const oneDay = 1000 * 60 * 60 * 24;
//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//   });

// };

export   {createJwt,isTokenValid}
