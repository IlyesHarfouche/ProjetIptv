const { exec } = require('child_process');
const express = require('express');
const { ConvertJson } = require('./ConvertJson');
const app = express();
const fs = require('fs');

app.get('/chargement', (req, res) => {
  res.sendFile(__dirname + '/chargement.html');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/table.html');
});


//La méthode express.urlencoded() est un middleware qui est utilisé pour parser 
//les données envoyées par un formulaire HTML sous forme d'URL encodées. Cette 
//méthode analyse le corps de la requête HTTP pour extraire les données du 
//formulaire et les rend disponibles dans l'objet req.body

app.use(express.urlencoded({ extended: true }));



app.post('/chooseFreq', (req, res) => {
  const multicast = req.body.multicast;

  // Lire le contenu du fichier Freq.json
  fs.readFile('Freq.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la lecture du fichier.');
      return;
    }

    // Convertir le contenu en objet JavaScript
    let freqObject = JSON.parse(data);

    // Ajouter les clés et valeurs demandées
    freqObject.Mode = req.body.mode;
    freqObject.adapter = req.body.adapter;

    // Enregistrer l'objet mis à jour dans le fichier
    fs.writeFile('Freq.json', JSON.stringify(freqObject), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'enregistrement des clés dans le fichier.');
      } else {
        console.log('Les clés ont été enregistrées avec succès.');
        res.setHeader('Content-type', 'text/html');
        res.send(`
          <script>
            alert("Réussite !");
            window.location.href = "/";
          </script>
        `);
      }
    });
  });
});




// app.post('/chooseFreq', (req, res) => {
//   const multicast = req.body.multicast;

//   // Lire le contenu du fichier Freq.json
//   fs.readFile('Freq.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Erreur lors de la lecture du fichier.');
//       return;
//     }

//     // Convertir le contenu en objet JavaScript
//     let freqObject = JSON.parse(data);

//     // Ajouter la fréquence à l'objet
//     freqObject.frequence = multicast;

//     // Enregistrer l'objet mis à jour dans le fichier
//     fs.writeFile('Freq.json', JSON.stringify(freqObject), 'utf8', (err) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Erreur lors de l\'enregistrement de la fréquence dans le fichier.');
//       } else {
//         console.log('La fréquence a été enregistrée avec succès.');
//         res.setHeader('Content-type', 'text/html');
//         res.send(`
//           <script>
//             alert("Réussite !");
//             window.location.href = "/";
//           </script>
         
//         `);
//       }
//     });
//   });
// });

// Exécute la commande scan lorsqu'on reçoit une requête POST sur la route /scan
app.post('/scan', (req, res) => {
  const adapter = req.body.adapter || 0;
  //const freq = req.body.freq-input ||  "586166000"
  
    const IDprocessDVB ="\`ps aux|grep dvblast|grep -v '/bin/sh'|grep -v grep|cut -d' ' -f3\`"
    const runScan = `scan /usr/share/dvb/dvb-legacy/dvb-t/fr-Paris -a ${adapter} > chaines.conf`;      
    const command = `if  ! [[ "" -eq "${IDprocessDVB}" ]]; then kill -9 ${IDprocessDVB}; ${runScan} ; else ${runScan} ; fi` ;
    
    console.log(`app.js:stdout: ${command}`);
    res.send(`
      
<script>
  window.location.href = "http://192.168.5.146:8080/chargement";
</script>`)
   
  exec(command, (error, stdout, stderr) => {
   
    
    if (error) {
      console.error(`Erreur lors de l'exécution de la commande : ${error.message}`);
      res.status(500).send(`Erreur lors de l'exécution de la commande : ${error.message}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    
    try {


      const channels = ConvertJson();
     
     

    } catch (err) {
      console.error(`Erreur lors de la conversion du fichier channels.conf en JSON : ${err.message}`);
      res.status(500).send(`Erreur lors de la conversion du fichier channels.conf en JSON : ${err.message}`);
    }
  });
});

// Démarrer le serveur
const port = 8080;
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
