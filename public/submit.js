const express = require('express');
const app = express();
const port = 6060;

app.get('/channels', (req, res) => {
  res.sendFile(__dirname + '/channels.json');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Test.html');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
