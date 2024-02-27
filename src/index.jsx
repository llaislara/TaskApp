const express = require('express');
const app = express();

app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js') || path.endsWith('.jsx')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
