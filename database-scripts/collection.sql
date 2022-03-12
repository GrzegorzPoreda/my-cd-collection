DROP DATABASE IF EXISTS cdcollection;
CREATE DATABASE cdcollection;
USE cdcollection;

DROP TABLE IF EXISTS Albumy; 

CREATE TABLE Albumy (
	ID INT NOT NULL AUTO_INCREMENT,
	Nazwa VARCHAR(30) NOT NULL,
    Artysta VARCHAR(30) NOT NULL,
    Rok_Wydania INT NOT NULL,
	PRIMARY KEY (ID)
) ENGINE=InnoDB;

INSERT INTO Albumy (Nazwa, Artysta, Rok_Wydania) VALUES
	('Wildhoney', 'Tiamat', 1994),
	('Kill \'Em All', 'Metallica', 1983),
	('Ride the Lightning', 'Metallica', 1984),
	('Master of Puppets', 'Metallica', 1986),
	('...And Justice for All', 'Metallica', 1988);
    
SELECT * FROM Albumy;