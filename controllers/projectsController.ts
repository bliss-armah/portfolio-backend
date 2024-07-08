import { Request, Response } from "express";
import prisma from "../config";
import { StatusCodes } from "http-status-codes";
import { CustomExpressRequest } from "../types";
import { v2 } from "cloudinary";

const getAllProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(StatusCodes.OK).json({ data: projects });
};

const getProject = async (req: Request, res: Response) => {
  const userId = (req as CustomExpressRequest).user.userId;
  const { id } = req.params;
  const project = await prisma.project.findMany({
    where: {
      id,
      creatorId: userId,
    },
  });

  if (project.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No project found with id: ${id}` });
  }

  if (!project) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No project found with id: ${id}` });
  }
  res.status(StatusCodes.OK).json({ data: project });
};

const createProject = async (req: Request, res: Response) => {
  console.log(req.files);
  if (!req.files || !req.files.image) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "No image provided" });
  }
  const image = Array.isArray(req.files.image)
    ? req.files.image[0]
    : req.files.image;

  const result = await v2.uploader.upload(image.tempFilePath, {
    use_filename: true,
  });

  const imageUrl = result.secure_url;

  const createdBy = {
    connect: { id: Number((req as CustomExpressRequest).user.userId) },
  };
  req.body.createdby = createdBy;
  req.body.image = imageUrl;
  const job = await prisma.project.create({
    data: req.body,
  });

  if (!job) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Project creation failed" });
  }
  res.status(StatusCodes.CREATED).json({ data: job });
};

const updateProject = async (req: Request, res: Response) => {
  const userId = (req as CustomExpressRequest).user.userId;
  const { id } = req.params;
  const findProject = await prisma.project.findUnique({
    where: {
      id: id,
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

  if (findProject?.createdby.id !== userId) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `You're not eligible to update this project` });
  }

  const project = await prisma.project.update({
    where: {
      id: id,
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

const uploadImage = async (req: Request, res: Response) => {
  if (!req.files || !req.files.image) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "No image provided" });
  }
  const image = Array.isArray(req.files.image)
    ? req.files.image[0]
    : req.files.image;

  const result = await v2.uploader.upload(image.tempFilePath, {
    use_filename: true,
  });
  console.log(result);

  res.status(StatusCodes.CREATED).json({ msg: result.secure_url });
};

export {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  uploadImage,
};
