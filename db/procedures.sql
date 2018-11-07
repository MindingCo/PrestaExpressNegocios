USE pen;
DELIMITER $$
DROP FUNCTION IF EXISTS getNombreCliente$$
DROP FUNCTION IF EXISTS getidultimoPrestamoUsuario$$
DROP FUNCTION IF EXISTS getNombreAsesor$$
DROP FUNCTION IF EXISTS getClientePassword$$
DROP FUNCTION IF EXISTS getMontoPrestamo$$

DROP PROCEDURE IF EXISTS registrarCliente$$
DROP PROCEDURE IF EXISTS registrarAsesor$$
DROP PROCEDURE IF EXISTS registrarGerente$$
DROP PROCEDURE IF EXISTS registrarPrestamo$$
DROP PROCEDURE IF EXISTS registrarPagoContinuo$$
DROP PROCEDURE IF EXISTS ConsultarAsesor$$
DROP PROCEDURE IF EXISTS getDatosCliente$$
DROP PROCEDURE IF EXISTS getdatosPrestamoUsuario$$
DROP PROCEDURE IF EXISTS getHistorialpago$$
DROP PROCEDURE IF EXISTS ModificarCliente$$
DROP PROCEDURE IF EXISTS ConsultarAsesor$$
DROP PROCEDURE IF EXISTS addPrestamo$$

DROP TRIGGER IF EXISTS cliente_AI;
DROP TRIGGER IF EXISTS asesor_AI;
DROP TRIGGER IF EXISTS gerente_AI;

CREATE FUNCTION getNombreCliente(id_cliente INT) RETURNS VARCHAR(45)
    BEGIN
        RETURN(SELECT nom_cli FROM Cliente WHERE id_cli = id_cliente);
    END$$
CREATE FUNCTION getidultimoPrestamoUsuario(id_cliente int) RETURNS INT
    BEGIN
        RETURN(SELECT MAX(id_pre) FROM prestamo WHERE id_cli = id_cliente);
    END$$
CREATE FUNCTION getNombreAsesor(id_asesor INT) RETURNS VARCHAR(45)
    BEGIN
        RETURN(SELECT nom_ase FROM Asesor WHERE id_ase = id_asesor);
    END$$

CREATE FUNCTION getClientePassword(id_cliente INT) RETURNS VARCHAR(500)
    BEGIN
        RETURN(SELECT pass_cli FROM Cliente WHERE id_cli = id_cliente);
    END$$
CREATE FUNCTION getMontoPrestamo(id_monto INT) RETURNS INT
    BEGIN
        RETURN(SELECT mon_mon FROM MontoPrestamon WHERE id_mon = id_monto);
    END$$
CREATE FUNCTION sumarpagoscontinuos(id_prestamo INT) RETURN INT 
    BEGIN
       RETURN(SELECT SUM(mon_pag) from historialpagoscontinuos WHERE id_pre = id_prestamo);
    END$$
CREATE PROCEDURE registrarCliente(IN nombre VARCHAR(45), IN email VARCHAR(45), IN password VARCHAR(45), IN dir_neg VARCHAR(120), IN dir_casa VARCHAR(120),IN telefono int)
    BEGIN
        INSERT INTO cliente(nom_cli,ema_cli,pass_cli,din_cli,dih_cli,tel_cli) VALUES
        (nombre,email,password,dir_neg,dir_casa,telefono);  
    END$$

CREATE PROCEDURE registrarAsesor(IN nombre VARCHAR(45), IN email VARCHAR(45), IN password VARCHAR(45), IN telefono int , IN zona Varchar(120))
    BEGIN 
        INSERT INTO asesor(nom_ase,ema_ase,pass_ase,tel_ase,id_zon)VALUES
        (nombre,email,password,telefono,zone);
    END$$
CREATE PROCEDURE registrarGerente(IN nombre VARCHAR(45), IN email VARCHAR(45), IN password VARCHAR(45), IN telefono int)
    BEGIN
        INSERT INTO asesor(nom_ger,ema_ger,pass_ger,tel_ger)VALUES
        (nombre,email,password,telefono);
    END$$
CREATE PROCEDURE registrarPrestamo(IN fec_final DATE,IN id_monto INT,IN id_cliente INT)
    BEGIN
        INSERT INTO Prestamo(fec_ini,fec_fin,id_mon,id_cli)VALUES
        (LOCALTIMESTAMP(),fec_final,id_monto,id_cliente);
    END$$
CREATE PROCEDURE registrarPagoContinuo(IN id_prestamo INT, IN fecha DATE, IN monto INT, IN comentario VARCHAR(200))
    BEGIN
        INSERT INTO HistorialPagosContinuos(id_pre,fec_pag,mon_pag,com_pag)VALUES
        (id_prestamo,fecha,monto,comentario);
    END$$
CREATE PROCEDURE getDatosCliente(IN id_cliente INT)
    BEGIN
        SELECT nom_cli,ema_cli,din_cli,dih_cli,tel_cli FROM Cliente WHERE id_cli = id_cliente;
    END$$
CREATE PROCEDURE getdatosPrestamoUsuario(IN id_prestamo int)
    BEGIN
        SELECT MontoPrestamo.mon_mon AS "Monto Prestado",Prestamo.fec_ini AS "Fecha de prestamo",Prestamo.fec_fin AS "Fecha de liquidación" FROM MontoPrestamo INNER JOIN Prestamo ON MontoPrestamo.id_mon = Prestamo.id_mon INNER JOIN Cliente ON Prestamo.id_cli = Cliente.id_cli WHERE Cliente.id_cli = id_cliente AND Prestamo.id_pre = id_prestamo;  
    END$$
CREATE PROCEDURE getHistorialpago(IN id_prestamo int)
    BEGIN
        SELECT mon_pag AS "Monto pagado",fec_pag AS "fecha de pago",com_pag AS "Comentario" FROM HistorialPagosContinuos WHERE id_pre = id_prestamo;
    END$$
CREATE PROCEDURE ModificarCliente(IN id_cliente INT, IN newpassword VARCHAR(500))
    BEGIN
        UPDATE ModificarCliente SET pass_cli = newpassword WHERE id_cli = id_cliente;
    END$$
CREATE PROCEDURE ConsultarAsesor(IN id_asesor INT)
    BEGIN
        SELECT asesor.nom_ase AS 'Nombre', asesor.ema_ase AS 'Email', asesor.tel_ase AS 'Telefono', Zona.nom_zon AS 'Zona' FROM  asesor INNER JOIN Zona ON asesor.id_zon = Zona.id_zon WHERE id_ase = id_asesor;
    END$$

CREATE PROCEDURE diasparapagar(IN id_prestamo INT)
    BEGIN
        SELECT DATEDIFF((SELECT fec_fin FROM prestamo where id_pre = id_prestamo), CURDATE());        
    END$$
CREATE PROCEDURE Montofaltante(IN id_prestamo INT)
    BEGIN
        SELECT(MontoPrestamo.mon_mon-SUM(HistorialPagosContinuos.mon_pag)) FROM MontoPrestamo INNER JOIN Prestamo ON MontoPrestamo.id_mon = Prestamo.id_mon INNER JOIN HistorialPagosContinuos ON Prestamo.id_pre = HistorialPagosContinuos.id_pre WHERE Prestamo.id_pre = id_prestamo; 
    END$$

CREATE TRIGGER cliente_AI AFTER INSERT ON cliente FOR EACH ROW 
INSERT INTO usuario(id_tus,nom_usu,pass_usu)VALUES('1',NEW.nom_cli,NEW.pass_cli);

CREATE TRIGGER asesor_AI AFTER INSERT ON asesor FOR EACH ROW 
INSERT INTO usuario(id_tus,nom_usu,pass_usu)VALUES('2',NEW.nom_ase,NEW.pass_ase);

CREATE TRIGGER gerente_AI AFTER INSERT ON cliente FOR EACH ROW 
INSERT INTO usuario(id_tus,nom_usu,pass_usu)VALUES('3',NEW.nom_ger,NEW.pass_ger);
DELIMITER;
