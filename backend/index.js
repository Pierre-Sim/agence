const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Erreur connexion DB:', err);
        process.exit(1);
    }
    console.log('Connecté à la base MySQL');

    app.listen(process.env.PORT, () => {
        console.log(`Serveur backend sur http://localhost:${process.env.PORT}`);
    });
});

app.post('/api/contact', [
    body('civilite').isIn(['M', 'Mme', 'Autre']).withMessage('Civilité invalide'),
    body('nom').isLength({ min: 1, max: 60 }).trim().escape().withMessage('Nom invalide'),
    body('prenom').isLength({ min: 1, max: 60 }).trim().escape().withMessage('Prénom invalide'),
    body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
    body('telephone').isLength({ min: 10, max: 10 }).trim().escape().withMessage('Téléphone invalide'),
    body('motif').isIn(['Visite', 'Rappel', 'Photos']).withMessage('Motif invalide'),
    body('message').isLength({ min: 1, max: 400 }).trim().escape().withMessage('Message invalide'),
    body('disponibilites').isArray({ max: 3 }).withMessage('Disponibilités invalides'),
    body('disponibilites').isArray({ min: 1 }).withMessage('Au moins une disponibilité est requise')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }

    const {
        civilite, nom, prenom, email,
        telephone, motif, message, disponibilites
    } = req.body;

    const sql = `
        INSERT INTO contact
        (civilite, nom, prenom, email, telephone, motif, message, disponibilites)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        civilite, nom, prenom, email, telephone,
        motif, message, JSON.stringify(disponibilites)
    ], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Erreur lors de l'enregistrement.");
        }
        res.status(200).send("Formulaire enregistré !");
    });
});
