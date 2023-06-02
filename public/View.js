
const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const appp = express();

const server = http.createServer((req, res) => {
const filePath = path.join(__dirname, 'channels.conf');
const stat = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  const readStream = fs.createReadStream(filePath);

  res.write(`
    <html>
  <head>
  <link rel="stylesheet" href="Style.css">

        <title>Channels</title>
      </head>
      <body>
        <h1>Liste des chaines</h1>
        <h4>CHAINES DIFFUSEES PAR L'A-IPTV :</h4>
        <pre>`);

  readStream.pipe(res, { end: false });

  readStream.on('end', () => {
    res.write(`</pre>
    <tbody> <button class="btnRetour" onclick="effacerContenu()">EFFACER LE CONTENU DU FICHIER</button> </tbody>
    <button class="btnRetour" onclick="window.location.href = 'http://192.168.5.146:3000/index';">BACK</button>
    <script>
      function effacerContenu() {
        fetch('/effacer-fichier', { method: 'POST' })
          .then(() => {
            console.log('Contenu du fichier effacé');
          })
          .catch((err) => {
            console.error(err);
          });
      }
    </script>
    
    <style>  body
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
          }</style>
              
  </html>`);
    res.end();
    
  });
});

server.on('request', (req, res) => {
  if (req.method === 'POST' && req.url === '/effacer-fichier') {
    const filePath = path.join(__dirname, 'channels.conf');
    fs.writeFileSync(filePath, '');
    console.log('Contenu du fichier effacé');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Contenu du fichier effacé');
  }
});

server.listen(8082, () => {
  console.log('Serveur lancé sur le port 8082');
});


