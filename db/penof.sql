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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor`
--

LOCK TABLES `asesor` WRITE;
/*!40000 ALTER TABLE `asesor` DISABLE KEYS */;
INSERT INTO `asesor` VALUES (20,'4cb4aad18bc4206e50575f730523dd1bef5de715fc7d12d7024998073ac71205','ase@pr.com','fcea9e70ac2a5455a1786222e60fa77a',1),(21,'d54c9d2239c53367f6f7b42300eacaa6','kk@kk','fcea9e70ac2a5455a1786222e60fa77a',2),(22,'f3cc619ac0a4963cc3cdd2ea4f27984ee62b4bde26729ca82dfe8e45df583868','robert@gamil.com','85cd9ceac35cb1c30df44c505701dcfd',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (11,'843d4650e6c2ac2767c627d3745e3f6adca7f45ad4eb6766d711987764dad929','juan@we.de','539d81cb849772ecb9f4a0b5ab0723c0','be51a71fe3390e64c275725aa2a073ba','fcea9e70ac2a5455a1786222e60fa77a'),(12,'b1159824c41760377058b091e9649146','bb@bb.com','539d81cb849772ecb9f4a0b5ab0723c0','be51a71fe3390e64c275725aa2a073ba','fcea9e70ac2a5455a1786222e60fa77a'),(13,'2a5fbe9652bbfd1839b721c082f9007f','mm@mm.com','539d81cb849772ecb9f4a0b5ab0723c0','be51a71fe3390e64c275725aa2a073ba','fcea9e70ac2a5455a1786222e60fa77a'),(14,'91c1a28fbe8bc257f23c19ebf50a91b0','ff@ff.com','539d81cb849772ecb9f4a0b5ab0723c0','be51a71fe3390e64c275725aa2a073ba','fcea9e70ac2a5455a1786222e60fa77a'),(15,'98394ecd14f625e083840256a85a706e8b66514270a04ce068fe6917bc4bca44','gerar@gmail.com','0aed49cbbe4bb2859579c19472861e19','3d4a2579c2bf1f8857356203c41d3733','2411ddce554a07c792dfb0c6822900c7'),(16,'9e08003be7d7399982b5ba2c37ec0cf2917c3dc0c0fece42598e36ccf9bc1b1b','ram@gmail.com','b7a2ff815e0cca4928e510d833dc8778','11c678c5196c7494d3f50f5e47194a18','cbb71789b9bac4991d5fa453ac877cad'),(18,'bf1cf67e3a0ffccdf873e059d0a83d420270fcd2e7ab45658e14c0eae021bc5e','ola@mail.com','e379b868c0e5a59cddbac716733468a8','4fa0c683ab696f874564c1b1565041db','6f3a679d0d6a550fc45fd61806d5c3b8');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gerente`
--

LOCK TABLES `gerente` WRITE;
/*!40000 ALTER TABLE `gerente` DISABLE KEYS */;
INSERT INTO `gerente` VALUES (5,'b6982b8bd220729e89b382b7fcaf7c74af340ca2642ddbcca68a4105d30f9acf','fcea9e70ac2a5455a1786222e60fa77a','gr@pr.es'),(6,'d54c9d2239c53367f6f7b42300eacaa6','fcea9e70ac2a5455a1786222e60fa77a','kk@kk'),(7,'0dfa8f83330ba395e7423dc9d7d83eb5','fcea9e70ac2a5455a1786222e60fa77a','popo@popo'),(8,'423824b28fa1e36549123111cc73fa73557c5bcd97c842dc156985c795f2be11','b30656a8b4701df560cd326dd9387173','jesus@gmail.com');
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialpagos`
--

LOCK TABLES `historialpagos` WRITE;
/*!40000 ALTER TABLE `historialpagos` DISABLE KEYS */;
INSERT INTO `historialpagos` VALUES (20,8,'2018-11-09','200','Todo bien brother'),(21,8,'2018-11-10','200','Nada, todo bien we'),(25,8,'2018-11-22','200','Todo bien, no se puso al pedo el perro este.'),(26,12,'2018-11-27','300','Todo bien'),(27,9,'2018-11-27','200','Todo bien'),(32,14,'2018-12-02','200','Todo bien');
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jerarquia`
--

LOCK TABLES `jerarquia` WRITE;
/*!40000 ALTER TABLE `jerarquia` DISABLE KEYS */;
INSERT INTO `jerarquia` VALUES (21,5,20),(22,5,21),(23,8,22);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
INSERT INTO `prestamo` VALUES (8,11,20,'2018-11-08','74421c48eaf488a12f59cf24ee65267a','0','bf017403bfe504bf66f84010f967ced6'),(9,12,21,'2018-11-22','7d42b5023edb5332b9207bfae57b7fe0','3800','670d56029ad0372137f004caec943a35'),(11,11,20,'2018-11-22','242597cbaa6275b4fe5d4070ccaeb289','3649','88ae15119fcbff18fec61ea63b225734'),(12,13,20,'2018-11-22','b3f78c41b1cbd0438c86c3eb6b34d1eb','0','8b590d3607920ef08b8067f844cd9b60'),(13,15,22,'2018-12-02','33d158ebadfa818d85084993fc71b8d2','0','8b590d3607920ef08b8067f844cd9b60'),(14,16,22,'2018-12-02','65e2743dea191f24d11883323466d42a','5600','bf017403bfe504bf66f84010f967ced6');
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (37,1,'843d4650e6c2ac2767c627d3745e3f6adca7f45ad4eb6766d711987764dad929','$2a$10$NtSiO27PyWnGGLe9JOYruuaKDSl/8BgJXaV2jF1oXZ0bmMgf4DaQu','priegod'),(38,2,'4cb4aad18bc4206e50575f730523dd1bef5de715fc7d12d7024998073ac71205','$2a$10$PYLCpToPyl6g9h0RoLPv7u4McTh5yQF3ETabacOMcSQMHFaLOhAsq','asepr'),(39,3,'b6982b8bd220729e89b382b7fcaf7c74af340ca2642ddbcca68a4105d30f9acf','$2a$10$PYLCpToPyl6g9h0RoLPv7u4McTh5yQF3ETabacOMcSQMHFaLOhAsq','gpr'),(40,2,'d54c9d2239c53367f6f7b42300eacaa6','$2a$10$PYLCpToPyl6g9h0RoLPv7u4McTh5yQF3ETabacOMcSQMHFaLOhAsq','kk'),(41,3,'d54c9d2239c53367f6f7b42300eacaa6','$2a$10$PYLCpToPyl6g9h0RoLPv7u4McTh5yQF3ETabacOMcSQMHFaLOhAsq','poce'),(42,3,'0dfa8f83330ba395e7423dc9d7d83eb5','$2a$10$PYLCpToPyl6g9h0RoLPv7u4McTh5yQF3ETabacOMcSQMHFaLOhAsq','pp'),(43,4,'','$2a$10$aqvWPl.Q.7YKtef7eVfI3O2oCP/lhVbLINtRD/nOzWZSL0h6skAWS','admin'),(44,1,'b1159824c41760377058b091e9649146','$2a$10$vmWGZN3Wa6ny/EGQvFHisubiDM7uUWdocXyMTLOeCr4cF4/kluETS','bb'),(45,1,'2a5fbe9652bbfd1839b721c082f9007f','$2a$10$lYHvuR8xXL8g9cYLoNB0vupkQjRZwUYMXwB1rMtQo4/792r1ORGpO','mm'),(46,1,'91c1a28fbe8bc257f23c19ebf50a91b0','$2a$10$UVcJ.NWv7wBTY8/5pAAIhOXbfeZeCvzCBd4sHNqiKcynZH5vvnFEW','ff'),(47,1,'98394ecd14f625e083840256a85a706e8b66514270a04ce068fe6917bc4bca44','$2a$10$OdaJUfgLe218sJyJ3rV.muU7xPYpBCxgJJL5RAGVfoWUlh0j0D9YO','elkarin'),(48,3,'423824b28fa1e36549123111cc73fa73557c5bcd97c842dc156985c795f2be11','$2a$10$llOAXd3RL7plgVTwiWXIUuz5bEFOWcZZpBoMTcga9/ltTHPQYqdMq','user11'),(49,2,'f3cc619ac0a4963cc3cdd2ea4f27984ee62b4bde26729ca82dfe8e45df583868','$2a$10$LCD7wCndZ/MMAFdiVsAgVesdPNUD/URpirJFjKJp/mv.QIyvNCzx2','user12'),(50,1,'9e08003be7d7399982b5ba2c37ec0cf2917c3dc0c0fece42598e36ccf9bc1b1b','$2a$10$k6nlonY4TsZ4sCw6OMB7Ru1wAFjYAmsy417UIOgSUq3gXN2CliDfq','client1'),(51,1,'bf1cf67e3a0ffccdf873e059d0a83d420270fcd2e7ab45658e14c0eae021bc5e','$2a$10$xQUHIJK9TLHdhvPT.RKtxOkBpuyCq7FsTuh5pqYR/2w2lGO0WfOhS','elyamcha');
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
        INSERT INTO asesor VALUES
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
        INSERT INTO gerente VALUES
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

-- Dump completed on 2018-12-02  3:29:55
