## This build uses **`Next.js`** and **`Node.js/Express/MonogDB`**.

`./api is the Express Server.`

I am figuring out how to deploy a **MERN STACK** app, till then just clone this repo and run the following commands.

```bash
cd MERN-TODO-APP
npm install #installs the next.js dependencies
cd api
npm install #installs the node.js dependencies
#then
npm run dev #This runs the next.js frontend
#open another terminal
cd api
npm start #Runs the server.js file with nodemon
```
Then goto http://localhost:3000 and ofcourse you need to have **`MongoDb`** installed and running in your system.