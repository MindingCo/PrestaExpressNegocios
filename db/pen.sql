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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor`
--

LOCK TABLES `asesor` WRITE;
/*!40000 ALTER TABLE `asesor` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gerente`
--

LOCK TABLES `gerente` WRITE;
/*!40000 ALTER TABLE `gerente` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialpagos`
--

LOCK TABLES `historialpagos` WRITE;
/*!40000 ALTER TABLE `historialpagos` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jerarquia`
--

LOCK TABLES `jerarquia` WRITE;
/*!40000 ALTER TABLE `jerarquia` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES (1,'Cliente'),(2,'kk');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (3,2,'kk','$2a$10$kTPa7gWtAJGxXHR.KL5mZ.LZgbagvzb0OkBJ6gdMGkGnRn1EY5ufe'),(4,1,'cc','$2a$10$n.nBxdyPjAJ7b.LYzrMqT.In4lnxQRh0sgf79hMi2r61tCOCXTLf.'),(5,1,'ola','$2a$10$sFgzt/S39FEkhcMQB7Q4TuZ8D5gdyact1EBrepiTMbKpv2oTEnTEy');
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

-- Dump completed on 2018-10-04  0:43:28
