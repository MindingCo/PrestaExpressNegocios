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
  `nom_ase` varchar(200) NOT NULL,
  `ema_ase` varchar(300) NOT NULL,
  `tel_ase` varchar(100) NOT NULL,
  `id_zon` int(11) NOT NULL,
  PRIMARY KEY (`id_ase`),
  KEY `id_zon` (`id_zon`),
  CONSTRAINT `asesor_ibfk_1` FOREIGN KEY (`id_zon`) REFERENCES `zona` (`id_zon`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor`
--

LOCK TABLES `asesor` WRITE;
/*!40000 ALTER TABLE `asesor` DISABLE KEYS */;
INSERT INTO `asesor` VALUES (3,'kk','kk@kk.com','678653',1),(4,'mm','mm@mm.com','35534',1),(5,'ff','mm@mm.com','35534',1),(6,'cc','mm@mm.com','35534',1),(7,'c','mm@mm.com','35534',1),(8,'g','mm@mm.com','35534',1),(14,'po','po','po',1);
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
  `nom_cli` varchar(200) NOT NULL,
  `ema_cli` varchar(300) NOT NULL,
  `din_cli` varchar(300) NOT NULL,
  `dih_cli` varchar(300) NOT NULL,
  `tel_cli` varchar(100) NOT NULL,
  PRIMARY KEY (`id_cli`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Juan Carlos Soto Guzmán','ola@ola.com','calle 2','calle 3','55674357'),(2,'cc','cc@c.com','calle3','calle4','45535'),(3,'na','na@na.com','calle2','calle3','3545667'),(5,'mm','mm','mm','mm','mm'),(6,'joto','joto@de.es','Calle 4','Calle 3','1234567890'),(7,'Algo','algo@algo.com','Calle 4','Calle 3','54554545');
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
  `nom_ger` varchar(200) NOT NULL,
  `tel_ger` varchar(100) NOT NULL,
  `ema_ger` varchar(300) NOT NULL,
  PRIMARY KEY (`id_ger`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gerente`
--

LOCK TABLES `gerente` WRITE;
/*!40000 ALTER TABLE `gerente` DISABLE KEYS */;
INSERT INTO `gerente` VALUES (1,'ejem','33444','jaja@jaja.com'),(2,'Francisco Pacheco Pérez','7346734','bb@bb.com');
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
  `id_pre` int(11) NOT NULL,
  `fec_pag` date NOT NULL,
  `mon_pag` varchar(60) NOT NULL,
  `com_pag` text,
  PRIMARY KEY (`id_pag`),
  KEY `id_pre` (`id_pre`),
  CONSTRAINT `historialpagos_ibfk_1` FOREIGN KEY (`id_pre`) REFERENCES `prestamo` (`id_pre`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialpagos`
--

LOCK TABLES `historialpagos` WRITE;
/*!40000 ALTER TABLE `historialpagos` DISABLE KEYS */;
INSERT INTO `historialpagos` VALUES (2,1,'2018-10-05','500',''),(3,1,'2018-10-06','500',''),(4,1,'2018-01-10','500',''),(10,1,'2018-11-04','50','Todo bien, no se puso al pedo el perro este.'),(14,4,'2018-11-05','150','Ok'),(15,4,'2018-11-05','150','Ok'),(16,1,'2018-11-07','1','Todo bien, no se puso al pedo el perro este.'),(18,4,'2018-11-07','150','Todo bien, no se puso al pedo el perro este.');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jerarquia`
--

LOCK TABLES `jerarquia` WRITE;
/*!40000 ALTER TABLE `jerarquia` DISABLE KEYS */;
INSERT INTO `jerarquia` VALUES (1,1,3),(2,1,4),(3,1,5),(4,1,6),(5,1,7),(6,1,8),(7,2,3),(8,2,4),(9,2,5),(10,2,6),(11,2,7),(16,2,14);
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
  `moi_pre` varchar(60) NOT NULL,
  `mof_pre` varchar(60) NOT NULL,
  `mod_pre` varchar(60) NOT NULL,
  PRIMARY KEY (`id_pre`),
  KEY `id_cli` (`id_cli`),
  KEY `id_ase` (`id_ase`),
  CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`),
  CONSTRAINT `prestamo_ibfk_2` FOREIGN KEY (`id_ase`) REFERENCES `asesor` (`id_ase`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
INSERT INTO `prestamo` VALUES (1,1,3,'2012-06-07','223','233','1'),(4,3,3,'2018-11-05','5000','4850','150');
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
  `nom_usu` varchar(200) NOT NULL,
  `con_usu` varchar(500) DEFAULT NULL,
  `use_usu` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_usu`),
  KEY `id_tus` (`id_tus`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_tus`) REFERENCES `tipousuario` (`id_tus`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (3,2,'kk','$2a$10$kTPa7gWtAJGxXHR.KL5mZ.LZgbagvzb0OkBJ6gdMGkGnRn1EY5ufe','kk'),(4,1,'hahaha','$2a$10$n.nBxdyPjAJ7b.LYzrMqT.In4lnxQRh0sgf79hMi2r61tCOCXTLf.',NULL),(5,1,'Juan Carlos Soto Guzmán','$2a$10$QIFmBnhtHFPYhsxiwWZiLuYjTGzYqpGOjURBqWha91LByc0Qh31ea','ola'),(6,1,'jj','$2a$10$6zXWLV36QfOoGmrdi/MiCO6.IrmfGFMiGnDR596tU9OcJ4SxTJ9Oi',NULL),(8,1,'mm','$2a$10$HvUcTgH8q.vpqe/Puqo/vuP40nZaqJ9D3tEF51S6buRG0p4ss.FFq',NULL),(10,1,'hh','$2a$10$nHFl.0FX//LeXbHK6N.hQ.ZAhgrEIY4nK6u4r7ahz776MXdey1zAy',NULL),(12,2,'hh','$2a$10$Z7hWEwgZB5MHxjvwF40NOuGTERh3wF.3v1.hWSw4CsioBA2saFGoG',NULL),(13,2,'gg','$2a$10$/DdmrgYONl4mbRfhpEuo1.FzABdyFRhXUyfCRzab3QnDYF3IpKp0S',NULL),(14,2,'qq','$2a$10$P8vXgrF/ZD36mMAB6ciB5.zJX3BQJptQCvwY.rYBBLHubpXvsQcc2',NULL),(15,3,'Francisco Pacheco Pérez','$2a$10$tJ3Bh3ojYq5cUMEq1DsZH.9QR/Bl8sjG9KJs1f97B4XZobRyN8bKW','bb'),(16,1,'na','$2a$10$3ozzTK34ktmzuENvPb3HNeKTgRTe0GIsYS2VFtCkUH6i9b5bArOnq','na'),(20,1,'mm','$2a$10$lZNKcniX0Dny4uG.gILttelEaxMUC.N5Lo7YGGidG/pH/Bi.IglBm','mm'),(21,1,'joto','$2a$10$lVxh3lK9fCqrd1VWrGrdp.LhUv3yEEzILsfs53RB1ctfd8/RaHk2u','joto'),(27,2,'po','$2a$10$IVZEeQcOomBIiaOXFYweK.mXhhBWmf9gRs9LYZoEQ8a6/8h9JBNZq','po'),(28,1,'Algo','$2a$10$GkVz.TwO1EbPfEq8igjzFueN4F9qh1uxb01e8EVVkXE3kGL7/Wb1a','pazuco');
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

--
-- Dumping routines for database 'pen'
--
/*!50003 DROP PROCEDURE IF EXISTS `getHistorialpago` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getHistorialpago`(IN id_cli int)
BEGIN
        SELECT fec_pag,mon_pag,com_pag FROM HistorialPagos natural join prestamo WHERE id_cli = id_cli AND moi_pre != mof_pre;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrarAsesor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registrarAsesor`(IN user varchar(100), IN password VARCHAR(500), IN nombre VARCHAR(200), IN email VARCHAR(300),IN telefono varchar(100), IN zona int)
BEGIN
        INSERT INTO Asesor VALUES
        (0,nombre,email,teléfono,zona);  
        INSERT INTO usuario VALUES
        (0,2,nombre,password,user);  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrarCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registrarCliente`(IN user varchar(100), IN password VARCHAR(500), IN nombre VARCHAR(200), IN email VARCHAR(300), IN dir_neg VARCHAR(300), IN dir_casa VARCHAR(300),IN telefono varchar(100))
BEGIN
        INSERT INTO cliente VALUES
        (0,nombre,email,dir_neg,dir_casa,telefono);  
        INSERT INTO usuario VALUES
        (0,1,nombre,password,user);  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrarGerente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registrarGerente`(IN user varchar(100), IN password VARCHAR(500), IN nombre VARCHAR(200), IN email VARCHAR(300),IN telefono varchar(100))
BEGIN
        INSERT INTO Gerente VALUES
        (0,nombre, telefono, email);  
        INSERT INTO usuario VALUES
        (0,3,nombre,password,user);  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-07 19:30:22
