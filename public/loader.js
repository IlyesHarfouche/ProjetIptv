
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
  <header> 
  <h1>UN STREAM EST EN COURS</h1></header>
  <title>Channels</title>
  </head>
  <div class="loader">
  </div>
  
  <body>
    <h1>Liste des chaines</h1>
    <h4>CHAINES DIFFUSEES PAR L'A-IPTV :</h4>
    <pre>
<style>
.loader {
display: inline-block;
width: 190px;
height: 10px;
border-radius: 40px;
background-color: rgba(255, 255, 255, 1);
position: relative;
overflow: hidden;
}

.loader span {
font: 700 22px monospace;
text-transform: uppercase;
margin: auto;
color: #fff;
letter-spacing: 5px;
}

.loader::before {
content: "";
position: absolute;
top: 0;
left: -50px;
width: 150%;
height: 100%;
background-image: linear-gradient(332deg, #6bff7f, #32ff3c);
border-radius: inherit;
transform: scaleX(0);
transform-origin: left;
animation: load5123 1s infinite;
}

@keyframes load5123 {
50% {
  transform: scaleX(1);
}

100% {
  transform: scaleX(0);
  transform-origin: right;
}
}

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
    
    body
{

background-color: #212121; 
  color: white; 
text-align: center 
     }


</style>

`);

  readStream.pipe(res, { end: false });

  readStream.on('end', () => {
    res.write(`</pre>
  <footer> <form action="http://192.168.5.146:8081/launch" method="get">
          <button class="neon-box-1" type="submit">BACK</button></tbody></form></footer>
              
  </html>`);
    res.end();
    
  });
});



server.listen(8585, () => {
  console.log('Serveur lancé sur le port 8585');
});


