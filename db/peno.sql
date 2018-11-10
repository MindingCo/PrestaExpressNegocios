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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor`
--

LOCK TABLES `asesor` WRITE;
/*!40000 ALTER TABLE `asesor` DISABLE KEYS */;
INSERT INTO `asesor` VALUES (20,'4cb4aad18bc4206e50575f730523dd1bef5de715fc7d12d7024998073ac71205','ase@pr.com','fcea9e70ac2a5455a1786222e60fa77a',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (11,'843d4650e6c2ac2767c627d3745e3f6adca7f45ad4eb6766d711987764dad929','juan@we.de','539d81cb849772ecb9f4a0b5ab0723c0','be51a71fe3390e64c275725aa2a073ba','fcea9e70ac2a5455a1786222e60fa77a');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gerente`
--

LOCK TABLES `gerente` WRITE;
/*!40000 ALTER TABLE `gerente` DISABLE KEYS */;
INSERT INTO `gerente` VALUES (5,'b6982b8bd220729e89b382b7fcaf7c74af340ca2642ddbcca68a4105d30f9acf','fcea9e70ac2a5455a1786222e60fa77a','gr@pr.es');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialpagos`
--

LOCK TABLES `historialpagos` WRITE;
/*!40000 ALTER TABLE `historialpagos` DISABLE KEYS */;
INSERT INTO `historialpagos` VALUES (20,8,'2018-11-09','200','Todo bien brother');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jerarquia`
--

LOCK TABLES `jerarquia` WRITE;
/*!40000 ALTER TABLE `jerarquia` DISABLE KEYS */;
INSERT INTO `jerarquia` VALUES (21,5,20);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
INSERT INTO `prestamo` VALUES (8,11,20,'2018-11-08','74421c48eaf488a12f59cf24ee65267a','9800','bf017403bfe504bf66f84010f967ced6');
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (37,1,'843d4650e6c2ac2767c627d3745e3f6adca7f45ad4eb6766d711987764dad929','$2a$10$r03AMCZ6KBWxv1Fw.8vakO40JnRyAn5JB9yUkmJlNLc3MyiJeHo4C','priegod'),(38,2,'4cb4aad18bc4206e50575f730523dd1bef5de715fc7d12d7024998073ac71205','$2a$10$TgcNzDJR9BKgw6ZES7q0Rer7LS/KmMJqhBfzHUHSLFZz3l3gOcFM.','asepr'),(39,3,'b6982b8bd220729e89b382b7fcaf7c74af340ca2642ddbcca68a4105d30f9acf','$2a$10$lg2Wsjkt4Ci7r97RCuDNQOmVbVkrfGnopSDc.K1H4y55CX7lIiPA.','gpr');
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
INSERT INTO `zona` VALUES (1,'norte'),(2,'Sur'),(3,'Este'),(4,'Oeste');
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

-- Dump completed on 2018-11-09  2:27:47
