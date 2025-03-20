import {ApolloServer} from 'apollo-server-express'
import express, { Application } from 'express'

import typeDefs from './graphql.config'
import logger from '../utils/logger'

const app:Application = express()

const server=new ApolloServer({
    typeDefs,
    resolvers:[]
})

const startGraphqlServer=async()=>{
    await server.start()
  app.listen(4000, () => logger.info('Server running on http://localhost:4000/graphql'))
}

export default startGraphqlServer