const express = require('express');
const fs = require('fs');
const app = express();
const port = 3131;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Conf.html');
});


app.get('/convert', (req, res) => {
  const jsonFile = `${__dirname}/channels.json`;
  const confFile = `${__dirname}/channels.conf`;

  fs.readFile(jsonFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la lecture du fichier JSON.');
      return;
    }

    const jsonContent = JSON.parse(data);
    let confContent = '';

    for (const [key, value] of Object.entries(jsonContent)) {
      const line = `${value.ip} 1 ${value.sid} #${value.name} \n`;
      confContent += line;
    }

    fs.writeFile(confFile, confContent, 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'écriture du fichier .conf.');
        return;
      }

      /*res.send('Le fichier a été converti avec succès.');*/
      res.send(`
          <script>
            alert("Réussite !");
            window.location.href = "http://192.168.5.146:8081/launch";
          </script>`)
     
    });
  });
});

// Démarrer le serveur

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});




