import express from 'express';
import path from 'path';
import request from 'request';
const app = express();
const port = process.env.PORT || 9000;

//Serve public directory
app.use(express.static(path.resolve(__dirname, '../', 'public')));

//Proxy profile picture to get around CORS
app.get('/profile-picture/:userId', (req, res, next)=> {
  const userId = req.params.userId;
  const profilePictureUrl = `http://graph.facebook.com/${userId}/picture?width=800&height=800`;
  const proxy = request.get(profilePictureUrl);
  proxy.on('error', next);
  proxy.pipe(res);
});

app.listen(port);

console.log(`Listening on port ${port}`);
