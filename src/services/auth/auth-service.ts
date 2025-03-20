import { Request,Response } from "express"
import db from "../../config/prisma-config"
import logger from "../../utils/logger"
import bcrypt from 'bcrypt';
import { IUserLogin,IUserRegistration } from "../../interfaces/userInterface";
import { comparePassword } from "../../config/bcrypt-config";
import { generateToken } from "../../config/jwt-config";

class AuthService{
    async userRegistration(req:Request<{},{},IUserRegistration>,res:Response){
        const {name,email,password}=req.body
        try {
            const isExistingUser=await db.user.findUnique({
                where:{
                    email:email
                }
            })
            if(isExistingUser){
                logger.error(`ERROR:user with ${email} already exists, please try with different email`)
                 res.status(400).json({ error: `user with ${email} already exists, please try with different email` })
                 return
            }
            const hashedPassword=await bcrypt.hash(password,10)
            const newUser=await db.user.create({
                data:{
                    name:name,
                    email:email,
                    password:hashedPassword
                }
            })
          res.status(200).json({status:'Success',message:'User Created Succesfully',data:{
                name,email
            }})
            return
        } catch (error) {
            logger.error(`Error during registration: ${error}`)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
   async userLogin(req:Request<{},{},IUserLogin>,res:Response) {
        const {email,password} =req.body
        try {
            const isExistingUser=await db.user.findUnique({
                where:{
                    email:email
                }
            })
            if(!isExistingUser){
                logger.error(`ERROR:user with ${email} does not exist, please try with different email`)
                 res.status(400).json({ error: `user with ${email} does not exist, please try with different email` })
                 return
            }
            const isValidUser=comparePassword(password,isExistingUser.password || '')
            if(!isValidUser){
                logger.error(`ERROR:Wrong password, please try again!!`)
                 res.status(400).json({ error: `ERROR:Wrong password, please try again!!` })
                 return
            }
            const authToken=generateToken(isExistingUser.id,isExistingUser.email||'')
            logger.info(`user with ${email}, logged in succesfully`)
            res.status(200).json({message:'Login succesful',token:authToken})
            
        } catch (error) {
            logger.error(`Error during registration: ${error}`)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

export default AuthService