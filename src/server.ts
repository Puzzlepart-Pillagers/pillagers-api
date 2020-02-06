// ES6-style Imports
import * as dotenv from "dotenv"
dotenv.config()
import endpoints from "./endpoints"
import * as restify from "restify"
import corsMiddleware from "restify-cors-middleware"


const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ["get","post","put","options"],
    exposeHeaders: ['*']
  })

// Bootstrapping
const server = restify.createServer({
    name: 'pillagers-api',
    version: '1.0.0'
})

server.pre(cors.preflight)
server.pre(restify.plugins.pre.dedupeSlashes())
server.use(cors.actual)
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.jsonBodyParser())


// Load all endpoints
endpoints.initialize()

// Start listening
server.listen((process.env.PORT || 8080),
    () => console.log(`${server.name} listening at ${server.url}`))

export { server }