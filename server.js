
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// The template engine.
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Function to detect mobile devices
function isMobile(req) {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(req.header('User-Agent'));
}

// The main app root.
app.get('/', function (_, res) {
  res.send('Hello World! This is the root of my app.');
});

// Nionium Meet landing page route
app.get('/nionium-meet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'nionium-meet.html'));
});

// The meeting iframe route with query params, easier to test.
app.get('/meet', (req, res) => {
  const jwt = req.query.jwt;
  const appId = req.query.appId || 'vpaas-magic-cookie-2470d17a12394c6bacc2bbbe9e9d24d0';
  const roomName = req.query.roomName || 'defaultRoomName';
  const isMobileDevice = isMobile(req);
  res.render('index', { appId, jwt, roomName, isMobileDevice });
});

// The meeting iframe route with the roomName in path
app.get('/meet/:roomName', (req, res) => {
  const jwt = req.query.jwt;
  const appId = 'vpaas-magic-cookie-2470d17a12394c6bacc2bbbe9e9d24d0';
  const roomName = req.params.roomName || 'defaultRoom';
  const isMobileDevice = isMobile(req);
  res.render('index', { jwt, roomName, appId, isMobileDevice });
});

// Middleware to redirect URLs
app.use((req, res, next) => {
    const MAGIC_COOKIE_PART = 'vpaas-magic-cookie-2470d17a12394c6bacc2bbbe9e9d24d0/';
    console.log(`Original URL: ${req.url}`);
    if (req.url.includes(MAGIC_COOKIE_PART)) {
        const newUrl = req.url.replace(MAGIC_COOKIE_PART, '');
        console.log(`Redirecting to: ${newUrl}`);
        return res.redirect(301, newUrl);
    }
    next();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
