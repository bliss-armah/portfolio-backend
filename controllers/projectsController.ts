import { Request, Response } from "express";
import prisma from "../config";
import { StatusCodes } from "http-status-codes";
import { CustomExpressRequest } from "../types";


const getAllProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany()
  res.status(StatusCodes.OK).json({data: projects})
}

const createProject = async (req: Request, res: Response) => {
  const createdBy = { connect: { id: Number((req as CustomExpressRequest).user.userId) } }
  req.body.createdby =createdBy
  const job = await prisma.project.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({data: job})
  };


export { createProject,getAllProjects };
