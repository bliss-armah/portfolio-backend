import { Request, Response } from "express";
import prisma from "../config";
import { StatusCodes } from "http-status-codes";
import { CustomExpressRequest } from "../types";

const getAllProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany(
    {
      orderBy:{
        createdAt: "desc",
      }
    }
  );
  res.status(StatusCodes.OK).json({ data: projects });
};

const getProject = async (req: Request, res: Response) => {
  const userId = (req as CustomExpressRequest).user.userId;
  const { id } = req.params;
  const project = await prisma.project.findMany({
    where: {
      id: Number(id),
      creatorId: Number(userId),
    },
  });

  // if (project.length < 1) {
  //   return res
  //     .status(StatusCodes.NOT_FOUND)
  //     .json({ msg: `No project found with id: ${id}` });
  // }
 
  if (!project) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No project found with id: ${id}` });
  }
  res.status(StatusCodes.OK).json({ data: project });
};

const createProject = async (req: Request, res: Response) => {
  const createdBy = {
    connect: { id: Number((req as CustomExpressRequest).user.userId) },
  };
  req.body.createdby = createdBy;
  const job = await prisma.project.create({
    data: req.body,
  });

  if (!job) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Project creation failed'});
  }
  res.status(StatusCodes.CREATED).json({ data: job });
};

const updateProject = async (req: Request, res: Response) => {
  const userId = (req as CustomExpressRequest).user.userId;
  const { id } = req.params;
  const findProject = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      createdby: {
        select: {
          id: true,
        },
      }, 
    },
  });

  if (!findProject) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `This project does not exist` });
  }

  if (findProject?.createdby.id !== Number(userId)) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `You're not eligible to update this project` });
  }

  const project = await prisma.project.update({
    where: {
      id: Number(id),
      // creatorId: Number(userId),
    },
    data: req.body,
  });

  if (project) {
    return res.status(StatusCodes.OK).json({ data: project });
  }

  res
    .status(StatusCodes.NOT_FOUND)
    .json({ msg: `No project found with id: ${id}` });
};

export { createProject, getAllProjects, getProject, updateProject };
