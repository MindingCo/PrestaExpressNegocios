DROP DATABASE IF EXISTS PEN;
CREATE DATABASE PEN;
USE PEN;
CREATE TABLE Cliente(
	id_cli int PRIMARY KEY AUTO_INCREMENT,
	nom_cli varchar(45) NOT NULL,
	ema_cli varchar(45) NOT NULL,
	din_cli varchar(120) NOT NULL,
	dih_cli varchar(120) NOT NULL,
	tel_cli float NOT NULL
);
CREATE TABLE Zona(
	id_zon int PRIMARY KEY,
	nom_zon varchar(45) NOT NULL
);

CREATE TABLE Asesor(
	id_ase int PRIMARY KEY AUTO_INCREMENT,
	nom_ase varchar(45) NOT NULL,
	ema_ase varchar(45) NOT NULL,
	tel_ase float NOT NULL,
	id_zon int NOT NULL,
	FOREIGN KEY(id_zon)REFERENCES Zona(id_zon)
);
CREATE TABLE Prestamo(
	id_pre int PRIMARY KEY AUTO_INCREMENT,
	id_cli int NOT NULL,
	id_ase int NOT NULL,
	fec_pre DATE NOT NULL,
	moi_pre int NOT NULL,
	mof_pre int NOT NULL,
	mod_pre int NOT NULL,
	FOREIGN KEY(id_cli)REFERENCES Cliente(id_cli),
	FOREIGN KEY(id_ase)REFERENCES Asesor(id_ase)
);
CREATE TABLE HistorialPagos(
	id_pag int PRIMARY KEY AUTO_INCREMENT,
	id_cli int NOT NULL,
	id_ase int NOT NULL,
	fec_pag DATE NOT NULL,
	mon_pag int NOT NULL,
	com_pag VARCHAR(200),
	FOREIGN KEY(id_cli)REFERENCES Cliente(id_cli),
	FOREIGN KEY(id_ase)REFERENCES Asesor(id_ase)
);
CREATE TABLE Gerente(
	id_ger int PRIMARY KEY AUTO_INCREMENT,
	nom_ger varchar(45) NOT NULL,
	tel_ger float NOT NULL,
	ema_ger varchar(45) NOT NULL,
	id_zon int NOT NULL,
	FOREIGN KEY(id_zon)REFERENCES Zona(id_zon)
);
CREATE TABLE Jerarquia(
	id_jer int PRIMARY KEY AUTO_INCREMENT,
	id_ger int NOT NULL,
	id_ase int NOT NULL,
	FOREIGN KEY(id_ger)REFERENCES Gerente(id_ger),
	FOREIGN KEY(id_ase)REFERENCES Asesor(id_ase)
);
CREATE TABLE TipoUsuario(
	id_tus int PRIMARY KEY AUTO_INCREMENT,
	nom_tus varchar(45) NOT NULL
);
CREATE TABLE Usuario(
	id_usu int PRIMARY KEY AUTO_INCREMENT,
	id_tus int NOT NULL,
	nom_usu varchar(45) NOT NULL,
	con_usu varchar(45) NOT NULL,
	FOREIGN KEY(id_tus)REFERENCES TipoUsuario(id_tus)
);
