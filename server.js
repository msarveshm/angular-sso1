function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    console.log('here');
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        console.log('here');
        console.log(req.get('host'));
        console.log(req.url);
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
const express = require('express');
const app = express();
console.log('here1');
app.use(requireHTTPS);
console.log('here1');
app.use(express.static('/package.json'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: '/package.json/'}
  );
  });
  app.listen(process.env.PORT || 8080);