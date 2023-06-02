const { exec } = require('child_process');
const express = require('express');
const app = express();
const fichierLancement = require('./Stream.js');
const fichierStop = require('./stop_stream.js');

// Utiliser express.urlencoded pour extraire le corps de la requête POST
app.use(express.urlencoded({ extended: true }));


// Affiche un formulaire HTML avec un champ "adapter" et un bouton pour lancer la commande
app.get('/launch', (req, res) => {
  res.send(`
  <title>Configuration ⵣPTV </title>
  <form action="/launch" method="post">
  <h1>LANCER UN STREAM DU MULTIPLEX </h1>
 
    <button class="btnRetour" type="submit">LANCER LE STREAM</button></form>
    
    <form action="/stop" method="post">
    <button class="btnValide" type="submit">ARRETER LE STREAM</button>
    </form>
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
        <button class="neon-box-1" onclick="window.location.href = 'http://192.168.5.146:6060/';">RETOUR</button>
        </html>
  `);
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Test.html');
});

// app.get('/StreamLoad', (req, res) => {
//   res.sendFile(__dirname + '/StreamLoader.html');
// });

app.post('/launch', async function (req, res) {
  res.send(` 
<script>
  window.location.href = "http://192.168.5.146:8585/loader";
</script>`)


  try {
    const resultat = await fichierLancement.lancerFlux(req);
    res.status(200).send(resultat);

  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur interne du serveur');
  }
});

app.post('/stop', async function (req, res) {
  try {
    const resultat = await fichierStop.checkDvblastProcess(req);
    res.status(200).send(resultat);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur interne du serveur');
  }
});

// Démarrer le serveur
const port = 8081;
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
                                                                                                                                                                                                                      