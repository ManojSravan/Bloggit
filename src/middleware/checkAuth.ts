import { Request,Response,NextFunction } from "express";
import { verifyToken } from "../config/jwt-config";
import logger from "../utils/logger";

const checkAuth=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const bearerToken=await req.headers.authorization?.split(' ')[1]
        if(!bearerToken){
            logger.error(`unsuccesfull attempt to access api, missing authentication token `)
            throw new Error('authentication token is required to login or signup')
        }
        const isValidToken=verifyToken(bearerToken);
        if(!isValidToken){
            logger.error(`unsuccesfull attempt to access api, invalid authentication token`)
            throw new Error('authentication token is not valid')
        }
        next()
    } catch (error) {
        throw new Error('authentication token is not valid')
    }
}

export default checkAuth