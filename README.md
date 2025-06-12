Voici mon travail pour le test dev web

Pour lancer l'application,
Cloner : https://github.com/Pierre-Sim/agence.git

Installer les dépendances
cd agence      # dossier front
npm install

cd ../backend
npm install

Lancer docker depuis la racine du projet
cd ..
docker-compose up --build

Lancer le backend node.js
cd backend
node index.js

Lancer le front react
cd ../agence
npm run dev

L'application est ouverte sur le port 5176 [(http://localhost:5176/)](http://localhost:5176/) et phpadmin est ouvert sur le port 8080 [(http://localhost:8080/)](http://localhost:8080/)
Sql est sur le port 3001

User : root
Password : verysecurepassword

Pour utiliser le site il suffit de remplir les champs et de cocher les options, juste pour les disponibilités il faut choisir une date avec le calendrier et écrire l'heure ensuite puis valider avec le bouton en dessous.
Et ensuite valider le tout avec le bouton envoyer.
Voilà à quoi ressemble le résultat chez moi
![image](https://github.com/user-attachments/assets/7977e67e-1a9e-4a02-9b3c-1009b34cc94e)
