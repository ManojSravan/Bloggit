import dotenv from 'dotenv'
dotenv.config()
const envConfig={
    port:process.env.PORT,
    jwtSecret:process.env.JWT_SECRET,
    jwtExpiry:process.env.JWT_EXPIRY
}
export default envConfig