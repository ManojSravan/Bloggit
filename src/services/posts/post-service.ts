import db from "../../config/prisma-config";
import { Request, Response } from "express";
import extractUserDataFromToken from "../../utils/decode-jwt";
import logger from "../../utils/logger";
import IPost from "../../interfaces/postInterface";
class postService {
  async createNewPost(req: Request<{},{},IPost>, res: Response) {
    const { userId, email, isAdmin } = extractUserDataFromToken(req);
    const {title,content}=req.body
    try {
      const result = await db.$transaction(async (prisma) => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!user) {
          logger.error(
            `user with ${email} made an unsuccesful attempt to create a post`
          );
          res.status(400).json({ message: "User data does not exist" });
          return;
        }

        if (!user.isAdmin) {
          logger.error(`ERROR: User with ID ${userId} is not an admin.`);
          throw new Error("User is not authorized to create posts.");
        }

         // Check if user has existing posts
         const postCount = await prisma.posts.count({
            where: { userId },
          })
  
          if (postCount === 0) {
            logger.info(`User ${userId} needs to complete their profile.`)
            throw new Error('Complete your profile to create a post.')
          }
          // Create the post if all checks pass
        const newPost = await prisma.posts.create({
            data: {
              title,
              content,
              userId,
            },
          })
  
          logger.info(`Post created successfully by User ID: ${userId}`)
          return newPost
      });
    } catch (error) {
        logger.error(`Error during post creation: ${error}`)
      res.status(400).json({ error: error  || 'Something went wrong.' })
    }
  }
  async updatePost(req: Request<{},{},IPost>, res: Response){
    
  }
}

export default postService;
