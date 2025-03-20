// index.ts
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

// Load all .graphql files
const typesArray = loadFilesSync(__dirname, { extensions: ['graphql'] })

// Merge all types and export
const typeDefs = mergeTypeDefs(typesArray)

export default typeDefs
