import { Request, Response } from "express";
import prisma from "../config";
import { StatusCodes } from "http-status-codes";
import { CustomExpressRequest } from "../types";


const getAllJobs = async (req: Request, res: Response) => {

  res.status(StatusCodes.OK).json({msg: `I got it`})
}

const createProject = async (req: Request, res: Response) => {
  const createdBy = { connect: { id: Number((req as CustomExpressRequest).user.userId) } }
  req.body.createdby =createdBy
  const job = await prisma.project.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({data: job})
  };


export { createProject,getAllJobs };
