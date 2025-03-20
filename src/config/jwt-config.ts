import jwt from 'jsonwebtoken'
import envConfig from './env-config'

const jwtSecret = envConfig.jwtSecret || 'fallback-secret'
const expiresIn = typeof envConfig.jwtExpiry === 'string' ? parseInt(envConfig.jwtExpiry) : envConfig.jwtExpiry || 3600

export const generateToken=(userId:string, email:string,isAdmin:boolean)=>{
    return jwt.sign({id:userId,email:email},jwtSecret,{expiresIn:expiresIn})
}

// Verify JWT Token
export const verifyToken = (token: string) => {
    try {
      const decodedToken=jwt.verify(token, jwtSecret)
      return decodedToken
    } catch (error) {
      return null
    }
}