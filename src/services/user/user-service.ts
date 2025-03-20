import { IUserProfile } from './../../interfaces/userInterface';
import db from "../../config/prisma-config";
import extractUserDataFromToken from '../../utils/decode-jwt';
import logger from '../../utils/logger';
import { Request, Response } from 'express';
 class userService{
    async userProfileCreation(req:Request<{},{},IUserProfile>,res:Response){
        const {email,isAdmin,userId}=extractUserDataFromToken(req)
        const {avatar,bio,coverImage,location,username,socialLinks,tags}=req.body
        try {
            const result = await db.$transaction(async (prisma) => {
                const user = await prisma.user.findUnique({
                  where: { id: userId },
                });
                if (!user) {
                  logger.error(
                    `user with ${email} made an unsuccesful attempt to update his profile`
                  );
                  res.status(400).json({ message: "User data does not exist" });
                  return;
                }
        
                if (!user.isAdmin) {
                  logger.error(`ERROR: User with ID ${userId} is not an admin.`);
                  throw new Error("User is not authorized to create posts.");
                }
                  // Create the post if all checks pass
                  const userProfile=await db.user.update({
                    where:{
                        id:userId
                    },data:{
                        avatar,
                        bio,
                        coverImage,
                        location,
                        username,
                        isAdmin:true
                    }
                  })
                  logger.info(`user profile created successfully by User ID: ${userId}`)
                  return userProfile
              });
        } catch (error) {
            throw new Error('internal server error'+error)
            logger.error('userprofile creation failed')
        }
    }
}