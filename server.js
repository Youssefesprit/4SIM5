import {createServer} from 'http';
import fs from 'fs';
import url from 'url';

const hostname = '127.0.0.1'; 
const port = process.env.PORT || 9090; 
const cheminFichierJSON = 'SteamGames.json';



const server = createServer((req, res) => {     
  fs.readFile(cheminFichierJSON, 'utf8', (err, data) => {
      const parsedUrl = url.parse(req.url, true);
      const paths = parsedUrl.pathname.split('/').filter(Boolean); 

      if (err) {
          console.error('Erreur de lecture du fichier JSON :', err);
          res.writeHead(500);
          res.end('Internal Server Error');
          return;
      }

      let jsonData;
      try {
          jsonData = JSON.parse(data);
      } catch (parseErr) {
          console.error('Erreur de parsing du JSON:', parseErr);
          res.writeHead(500);
          res.end('Internal Server Error');
          return;
      }

      if (paths[0] === 'game' && paths.length === 1 ) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(jsonData));
          return;
      } 

      if (paths[0] === 'game' && paths[1] === 'select' && paths[2] !== '') {
          console.log(paths[2]);
          var data_filter = jsonData.filter(e => e.Year > paths[2]);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(data_filter));
          return;
      } 

      res.writeHead(404);
      res.end('Not Found');
  });
});



server.listen(port, hostname, () => { 
    console.log(`Server running at http://${hostname}:${port}/`);

});


// Lire le fichier JSON

  