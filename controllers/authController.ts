import { hashPassword } from "./../utils/hashPassword";
import { Request, Response } from "express";
import prisma from "../config";
import { StatusCodes } from "http-status-codes";
import { createJwt } from "../utils/jwt";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide an email and password" });
    }

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
    res
      .status(StatusCodes.CREATED)
      .json({ newUser: userWithoutPassword, token });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An error occurred" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide an email and password" });
    }

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
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An error occurred during login" });
  }
};

const getUsers = async (res: Response) => {
  const user = await prisma.user.findMany();
  res.status(StatusCodes.OK).json({ user });
};

export { createUser, loginUser, getUsers };
