import { server } from "./server";
import * as restify from "restify"
import Azure from "./azure"; // Azure specifics
import Api from "./api"; // Everything else

export module Endpoints {

    export function initialize() {
        
        // specify endpoints below
        server.on('NotFound', Api.notFound);
        server.on('BadRequest', Api.badRequest);
        server.get("/echo/:name", Api.echo);
        server.post("/api/azure",Azure.post) // TODO
        server.get("/api/azure",Azure.get) // FETCHES ALL ROWS NOW
        server.get("/*", restify.plugins.serveStatic({ directory: "./public", default: "index.html" }))
    }
}

export default Endpoints;
