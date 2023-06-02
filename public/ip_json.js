const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const channelsFilePath = 'channels.json';

// Lire les données du fichier channels.json
const channelsData = JSON.parse(fs.readFileSync(channelsFilePath));

// Générer le formulaire
//let formHtml = '<form method="post" action="/update-ip">';
let formHtml = `
  <header>
    <h1>Configuration des canaux</h1>
    <h2>Entrez IP:PORT</h2>
    <h1>  </h1>
  </header>
  <form method="post" action="/update-ip">
`;

Object.keys(channelsData).forEach((channel) => {
  formHtml += `

    <h2>${channelsData[channel].name}</h2>
    <input type="text" name="${channel}" value="${channelsData[channel].ip}" />
  
  <h1>  </h1>
  <style>
  body
{
 
  background-color: #212121; 
    color: white; 
 text-align: center 
       }

       button {
        margin-left: 50px;
        margin-right: 50px;
        --green: #1BFD9C;
        font-size: 15px;
        padding: 0.7em 2.7em;
        letter-spacing: 0.06em;
        position: relative;
        font-family: inherit;
        border-radius: 0.6em;
        overflow: hidden;
        transition: all 0.3s;
        line-height: 1.4em;
        border: 2px solid var(--green);
        background: linear-gradient(to right, rgba(27, 253, 156, 0.1) 1%, transparent 40%,transparent 60% , rgba(27, 253, 156, 0.1) 100%);
        color: var(--green);
        box-shadow: inset 0 0 10px rgba(27, 253, 156, 0.4), 0 0 9px 3px rgba(27, 253, 156, 0.1);
      }
      
      button:hover {
        color: #82ffc9;
        box-shadow: inset 0 0 10px rgba(27, 253, 156, 0.6), 0 0 9px 3px rgba(27, 253, 156, 0.2);
      }
      
      button:before {
        content: "";
        position: absolute;
        left: -4em;
        width: 4em;
        height: 100%;
        top: 0;
        transition: transform .4s ease-in-out;
        background: linear-gradient(to right, transparent 1%, rgba(27, 253, 156, 0.1) 40%,rgba(27, 253, 156, 0.1) 60% , transparent 100%);
      }
      
      button:hover:before {
        transform: translateX(15em);
      }
  
  </style>
  
 
    `;
});


formHtml += '<footer><button type="submit">ENREGISTRER</button></form></footer>';

formHtml += '<a href="http://192.168.5.146:6060"><button type="button">RETOUR</button></a>';

// Middleware pour parser les données des formulaires
app.use(bodyParser.urlencoded({ extended: false }));

// Route pour afficher le formulaire
app.get('/', (req, res) => {
  res.send(formHtml);
});

// Route pour mettre à jour les adresses IP des chaînes
app.post('/update-ip', (req, res) => {
  // Parcourir les propriétés de req.body pour mettre à jour les adresses IP
  Object.keys(req.body).forEach((key) => {
    const channel = key;
    const newIp = req.body[key];
    channelsData[channel].ip = newIp;
  });

  // Écrire les données mises à jour dans le fichier channels.json
  fs.writeFileSync(channelsFilePath, JSON.stringify(channelsData));

  // Rediriger vers la page d'accueil
  res.redirect('/');
});

// Démarrer le serveur
const port = 2611;
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
