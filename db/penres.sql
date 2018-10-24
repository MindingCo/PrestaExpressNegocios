-- MySQL dump 10.13  Distrib 5.7.21, for Win32 (AMD64)
--
-- Host: localhost    Database: pen
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `pen`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `pen` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `pen`;

--
-- Table structure for table `asesor`
--

DROP TABLE IF EXISTS `asesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asesor` (
  `id_ase` int(11) NOT NULL AUTO_INCREMENT,
  `nom_ase` varchar(45) NOT NULL,
  `ema_ase` varchar(45) NOT NULL,
  `tel_ase` int(11) NOT NULL,
  `id_zon` int(11) NOT NULL,
  PRIMARY KEY (`id_ase`),
  KEY `id_zon` (`id_zon`),
  CONSTRAINT `asesor_ibfk_1` FOREIGN KEY (`id_zon`) REFERENCES `zona` (`id_zon`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor`
--

LOCK TABLES `asesor` WRITE;
/*!40000 ALTER TABLE `asesor` DISABLE KEYS */;
INSERT INTO `asesor` VALUES (3,'kk','kk@kk.com',678653,1),(4,'mm','mm@mm.com',35534,1),(5,'ff','mm@mm.com',35534,1),(6,'cc','mm@mm.com',35534,1),(7,'c','mm@mm.com',35534,1),(8,'g','mm@mm.com',35534,1);
/*!40000 ALTER TABLE `asesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id_cli` int(11) NOT NULL AUTO_INCREMENT,
  `nom_cli` varchar(45) NOT NULL,
  `ema_cli` varchar(45) NOT NULL,
  `din_cli` varchar(120) NOT NULL,
  `dih_cli` varchar(120) NOT NULL,
  `tel_cli` int(11) NOT NULL,
  PRIMARY KEY (`id_cli`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'ola','ola@ola.com','calle 2','calle 3',55674357),(2,'cc','cc@c.com','calle3','calle4',45535);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gerente`
--

DROP TABLE IF EXISTS `gerente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gerente` (
  `id_ger` int(11) NOT NULL AUTO_INCREMENT,
  `nom_ger` varchar(45) NOT NULL,
  `tel_ger` int(11) NOT NULL,
  `ema_ger` varchar(45) NOT NULL,
  PRIMARY KEY (`id_ger`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gerente`
--

LOCK TABLES `gerente` WRITE;
/*!40000 ALTER TABLE `gerente` DISABLE KEYS */;
INSERT INTO `gerente` VALUES (1,'ejem',33444,'jaja@jaja.com');
/*!40000 ALTER TABLE `gerente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialpagos`
--

DROP TABLE IF EXISTS `historialpagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historialpagos` (
  `id_pag` int(11) NOT NULL AUTO_INCREMENT,
  `id_cli` int(11) NOT NULL,
  `id_ase` int(11) NOT NULL,
  `fec_pag` date NOT NULL,
  `mon_pag` int(11) NOT NULL,
  `com_pag` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_pag`),
  KEY `id_cli` (`id_cli`),
  KEY `id_ase` (`id_ase`),
  CONSTRAINT `historialpagos_ibfk_1` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`),
  CONSTRAINT `historialpagos_ibfk_2` FOREIGN KEY (`id_ase`) REFERENCES `asesor` (`id_ase`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialpagos`
--

LOCK TABLES `historialpagos` WRITE;
/*!40000 ALTER TABLE `historialpagos` DISABLE KEYS */;
INSERT INTO `historialpagos` VALUES (2,1,3,'2018-10-05',500,''),(3,1,3,'2018-10-06',500,''),(4,2,3,'2018-01-10',500,'');
/*!40000 ALTER TABLE `historialpagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jerarquia`
--

DROP TABLE IF EXISTS `jerarquia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jerarquia` (
  `id_jer` int(11) NOT NULL AUTO_INCREMENT,
  `id_ger` int(11) NOT NULL,
  `id_ase` int(11) NOT NULL,
  PRIMARY KEY (`id_jer`),
  KEY `id_ger` (`id_ger`),
  KEY `id_ase` (`id_ase`),
  CONSTRAINT `jerarquia_ibfk_1` FOREIGN KEY (`id_ger`) REFERENCES `gerente` (`id_ger`),
  CONSTRAINT `jerarquia_ibfk_2` FOREIGN KEY (`id_ase`) REFERENCES `asesor` (`id_ase`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jerarquia`
--

LOCK TABLES `jerarquia` WRITE;
/*!40000 ALTER TABLE `jerarquia` DISABLE KEYS */;
INSERT INTO `jerarquia` VALUES (1,1,3),(2,1,4),(3,1,5),(4,1,6),(5,1,7),(6,1,8);
/*!40000 ALTER TABLE `jerarquia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamo`
--

DROP TABLE IF EXISTS `prestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prestamo` (
  `id_pre` int(11) NOT NULL AUTO_INCREMENT,
  `id_cli` int(11) NOT NULL,
  `id_ase` int(11) NOT NULL,
  `fec_pre` date NOT NULL,
  `moi_pre` int(11) NOT NULL,
  `mof_pre` int(11) NOT NULL,
  `mod_pre` int(11) NOT NULL,
  PRIMARY KEY (`id_pre`),
  KEY `id_cli` (`id_cli`),
  KEY `id_ase` (`id_ase`),
  CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`),
  CONSTRAINT `prestamo_ibfk_2` FOREIGN KEY (`id_ase`) REFERENCES `asesor` (`id_ase`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
INSERT INTO `prestamo` VALUES (1,1,3,'2012-06-07',223,234,1);
/*!40000 ALTER TABLE `prestamo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipousuario` (
  `id_tus` int(11) NOT NULL AUTO_INCREMENT,
  `nom_tus` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tus`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES (1,'Cliente'),(2,'Asesor'),(3,'gerente'),(4,'admin');
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_usu` int(11) NOT NULL AUTO_INCREMENT,
  `id_tus` int(11) NOT NULL,
  `nom_usu` varchar(45) NOT NULL,
  `con_usu` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_usu`),
  KEY `id_tus` (`id_tus`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_tus`) REFERENCES `tipousuario` (`id_tus`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (3,2,'kk','$2a$10$kTPa7gWtAJGxXHR.KL5mZ.LZgbagvzb0OkBJ6gdMGkGnRn1EY5ufe'),(4,1,'hahaha','$2a$10$n.nBxdyPjAJ7b.LYzrMqT.In4lnxQRh0sgf79hMi2r61tCOCXTLf.'),(5,1,'ola','$2a$10$K.zNd11rAdS37Bcox64Yjuf0A.yRQHjvenaQnmb1o6IzpB.HmNtj.'),(6,1,'jj','$2a$10$6zXWLV36QfOoGmrdi/MiCO6.IrmfGFMiGnDR596tU9OcJ4SxTJ9Oi'),(7,1,'ola','$2a$10$wevI2D8kjvbLA52Lo0MD5O60JTZTiqjd//zTFHezQ4bKlRfSqTyZq'),(8,1,'mm','$2a$10$HvUcTgH8q.vpqe/Puqo/vuP40nZaqJ9D3tEF51S6buRG0p4ss.FFq'),(10,1,'hh','$2a$10$nHFl.0FX//LeXbHK6N.hQ.ZAhgrEIY4nK6u4r7ahz776MXdey1zAy'),(11,1,'ola','$2a$10$sK4msUav32.fR5h31pqi5.km51pl9Dw5e8JRsNSS59Lv0djiwz97G'),(12,2,'hh','$2a$10$Z7hWEwgZB5MHxjvwF40NOuGTERh3wF.3v1.hWSw4CsioBA2saFGoG'),(13,2,'gg','$2a$10$/DdmrgYONl4mbRfhpEuo1.FzABdyFRhXUyfCRzab3QnDYF3IpKp0S'),(14,2,'qq','$2a$10$P8vXgrF/ZD36mMAB6ciB5.zJX3BQJptQCvwY.rYBBLHubpXvsQcc2'),(15,3,'bb','$2a$10$tJ3Bh3ojYq5cUMEq1DsZH.9QR/Bl8sjG9KJs1f97B4XZobRyN8bKW');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zona`
--

DROP TABLE IF EXISTS `zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zona` (
  `id_zon` int(11) NOT NULL,
  `nom_zon` varchar(45) NOT NULL,
  PRIMARY KEY (`id_zon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zona`
--

LOCK TABLES `zona` WRITE;
/*!40000 ALTER TABLE `zona` DISABLE KEYS */;
INSERT INTO `zona` VALUES (1,'norte');
/*!40000 ALTER TABLE `zona` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-24 15:09:51
