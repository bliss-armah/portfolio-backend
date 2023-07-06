import { NextFunction, Request, Response } from "express";
import prisma from "../config";
import { StatusCodes } from "http-status-codes";
import { isTokenValid } from "../utils/jwt";
import { CustomExpressRequest, IreqPayload } from "../types";
import { JwtPayload } from "jsonwebtoken";

const auth = async (req:Request, res:Response, next:NextFunction) => {
    // check header
   
    const authHeader = req.headers.authorization

    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Authentication invalid' });
    }
    const token = authHeader.split(' ')[1]
  
    try {
     const payload : JwtPayload = isTokenValid(token) as JwtPayload
     
      // attach the user to the job routes
      (req as CustomExpressRequest).user =  payload
      next()
    } catch (error) {
        return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Authentication invalid' });
    }
  }
  
  export default auth