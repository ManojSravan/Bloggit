import express,{Application} from 'express'
import logger from './utils/logger'
import envConfig from './config/env-config'
import router from './routes'
import checkAuth from './middleware/checkAuth'
import startGraphqlServer from './graphql/graphql.server'

 const app:Application=express()

//parsing or destructuring body
app.use(express.json())


 

//routes
app.use('/api',router)


app.listen(envConfig.port,()=>{
    logger.info(`server running at http://localhost:${envConfig.port}`)
})