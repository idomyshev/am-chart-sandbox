import 'dotenv/config'
import express from 'express';
import history from 'connect-history-api-fallback';

import {router} from "./router/index.js";
import {LANG} from "./settings/lang.js";
import {ROUTES_WITHOUT_AUTHORIZATION} from "./settings/routes.js";
import {uiFilepath} from "./helpers/index.js";

const app = express();

// Express configuration.
app.use(express.static("public")); // Use the express-static middleware.
app.use(express.static(uiFilepath));
app.use(express.json());       // To support JSON-encoded bodies.
app.use(express.urlencoded()); // To support URL-encoded bodies.


app.use(async function (request, response, next) {
  // Because Chrome doesn't support CORS for connections from localhost we need this for local development.
  // TODO Check that in heroku config it's false.
  if (process.env.ALLOW_ORIGIN_ALL === 'true') {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  }

  if (request.method === 'OPTIONS') {
    return next();
  }

  if (!ROUTES_WITHOUT_AUTHORIZATION.includes(request.url)) {
    // TODO Send 403? status when token is not presented or incorrect
    if (!request.headers['authorization']) {
      console.error('Auth error #1: try to access private route without access token.')
      console.log("Requested url: ", request.url)
      // TODO Enable authorization check for production.
      // TODO Not it's disabled. To enable uncomment next line and remove 'return next()' line after next one.
      //response.status(403).json({error: 'token_not_presented'});
      return next();
    }
    // TODO In case of using authorization uncomment and add additional logic.
    // const authToken = request.headers['authorization']?.split(" ")[1];
    // const modelUser = new UserModel();
    //const find = await modelUser.findByToken(authToken)
    // if (!find) {
    //   response.status(403).json({error: 'token_invalid'});
    // } else {
    //   return next();
    // }
    // --
  } else {
    return next();
  }
});

// Run node.js web server.
const serverPort = process.env.PORT || 3000;
console.log(`Node server will be started on port ${serverPort}`)
app.listen(serverPort,() => console.log(LANG.serverIsRunning(serverPort)));

app.use(history({ index: '/' }))
// Initialize router.
router(app, serverPort);