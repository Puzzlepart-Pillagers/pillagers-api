# PILLAGERS AZURE API ⚔️
### Node API for communicating with Azure Table storage

The Pillagers API-stack is as follows
  * restify as connect-style middleware
  * ts-node-dev, for node typescript-support and hot reloading
  * got, for lightweight http request handling 
  * dotenv for variable handlings

## Installation
  * clone
  * npm install
  * npm start

## Usage / Extending

Endpoint urls are specified in endpoints.ts and point to api.ts, which in turns contains the logic for the different endpoints.

To add a new endpoint, create a handler function in api.ts, and point to it from endpoints.ts