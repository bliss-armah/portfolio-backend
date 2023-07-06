import { hashPassword } from "./../utils/hashPassword";
import { Request, Response } from "express";
import prisma from "../config";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import {createJwt} from "../utils/jwt";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const emailAlreadyExists = await prisma.user.findUnique({
    where: { email },
  });
  if (emailAlreadyExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email already exists" });
  }
  const passwordhashed = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: passwordhashed,
    },
  });
  const { password: omitPassword, ...userWithoutPassword } = newUser;

  const token = createJwt(String(newUser.id));
  res.status(StatusCodes.CREATED).json({ newUser: userWithoutPassword, token });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid credentials" });
  }

  const { password: omitPassword, ...userWithoutPassword } = user;
  const token = createJwt(String(user.id));
  res.status(StatusCodes.OK).json({ user: userWithoutPassword, token });
};

const getUsers = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await prisma.user.deleteMany();
  res.status(StatusCodes.OK).json({user });
};



export { createUser, loginUser, getUsers };
