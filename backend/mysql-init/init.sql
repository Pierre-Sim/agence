CREATE DATABASE IF NOT EXISTS contact_agence DEFAULT CHARACTER SET utf8mb4;
USE contact_agence;

CREATE TABLE IF NOT EXISTS formulaire_contact (
                                                  id INT AUTO_INCREMENT PRIMARY KEY,
                                                  civilite VARCHAR(10),
    nom VARCHAR(60),
    prenom VARCHAR(60),
    email VARCHAR(100),
    telephone VARCHAR(20),
    motif VARCHAR(50),
    message TEXT,
    disponibilites JSON,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
