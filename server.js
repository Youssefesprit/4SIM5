import {createServer} from 'http';
import fs from 'fs';

const hostname = '127.0.0.1'; 
const port = process.env.PORT || 9090; 
const cheminFichierJSON = 'SteamGames.json';

const server= createServer((req, res) => {     
fs.readFile(cheminFichierJSON, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur de lecture du fichier JSON :', err);
      return;
    }
   
   if (req.url === '/game') {
    
    res.end(data);
    res.statusCode=200;
   }
    
  });
});



server.listen(port, hostname, () => { 
    console.log(`Server running at http://${hostname}:${port}/`);

});


// Lire le fichier JSON

  