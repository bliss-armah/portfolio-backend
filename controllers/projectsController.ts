import { Request, Response } from "express";
import prisma from "../config";
import { StatusCodes } from "http-status-codes";
import { CustomExpressRequest } from "../types";

const getAllProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany();
  res.status(StatusCodes.OK).json({ data: projects });
};

const getProject = async (req: Request, res: Response) => {
  const userId =(req as CustomExpressRequest).user.userId
  const { id } = req.params;
  const project = await prisma.project.findMany({
    where: {
      id: Number(id),
      creatorId: Number(userId)  
    }
  });
  
  if (project.length < 1) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No project found with id: ${id}` });
  }
  if (!project) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No project found with id: ${id}` });
  }
  res.status(StatusCodes.OK).json({ data: project });
};

const createProject = async (req: Request, res: Response) => {
  const createdBy = {
    connect: { id: Number((req as CustomExpressRequest).user.userId) },
  };
  console.log(createdBy)
  req.body.createdby = createdBy;
  const job = await prisma.project.create({
    data: req.body,
  });
  res.status(StatusCodes.CREATED).json({ data: job });
};

export { createProject, getAllProjects, getProject };
