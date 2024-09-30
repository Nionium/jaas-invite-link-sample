const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// The template engine.
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// The main app root.
app.get('/', function (_, res) {
  res.send('Hello World! This is the root of my app.');
});

// The meeting iframe route with query params, easier to test.
app.get('/meet', (req, res) => {
  /*
    The JaaS JWT. You will need to exchange your app's token with
    the JaaS one on redirect, assuming you will require login
    before joining the meeting. Otherwise, you can enable guest
    access from JaaS, skip the JWT and allow everyone.
  */
  const jwt = req.query.jwt;

  /*
    The appId in your JaaS admin console.
  */
  const appId = req.query.appId || 'vpaas-magic-cookie-2470d17a12394c6bacc2bbbe9e9d24d0';
  /*
    The roomName, a random string of alphanumeric characters.
  */
  const roomName = req.query.roomName || 'defaultRoomName';

  res.render('index', { appId, jwt, roomName });
});

// The meeting iframe route with the roomName in path, closer to
// how it'll look in practice, you just need to fill out the appId.
app.get('/meet/:roomName', (req, res) => {
  /*
    The JaaS JWT. You will need to exchange your app's token with
    the JaaS one on redirect, assuming you will require login
    before joining the meeting. Otherwise, you can enable guest
    access from JaaS, skip the JWT and allow everyone.
  */
  const jwt = req.query.jwt;

  /*
    The appId in your JaaS admin console. Please write it below.
  */
  const appId = 'vpaas-magic-cookie-2470d17a12394c6bacc2bbbe9e9d24d0';

  /*
    The roomName, a random string of alphanumeric characters.
  */
  const roomName = req.params.roomName || 'defaultRoom';

  res.render('index', { jwt, roomName, appId });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
