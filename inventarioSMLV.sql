-- :::::::::::::::TABLA DEPARTAMENTO:::::::::::::::
CREATE TABLE DEPARTAMENTO (
	Nombre VARCHAR(20) UNIQUE,
	Area VARCHAR(20) NOT NULL
);
-- LLAVE PRIMARIA DE DEPARTAMENTO
ALTER TABLE DEPARTAMENTO ADD PRIMARY KEY (Nombre,Area);
-- AÑADIR LLAVE EN EL CAMPO Area PARA REFERENCIARLO EN OTRA TABLA
CREATE UNIQUE INDEX depK1 ON DEPARTAMENTO (Area);



-- :::::::::::::::TABLA PROVEEDOR:::::::::::::::
CREATE TABLE PROVEEDOR (
	NombrePr VARCHAR(40) UNIQUE,
	PersonaContactoPr VARCHAR(50),
	Direccion VARCHAR(100),
	Telefono VARCHAR(10),
	Correo VARCHAR(45)
);
-- LLAVE PRIMARIA DE PROVEEDOR
ALTER TABLE PROVEEDOR ADD PRIMARY KEY (NombrePr);



-- :::::::::::::::TABLA PISO:::::::::::::::
CREATE TABLE PISO (
	DireccionPiso VARCHAR(10) UNIQUE,
	NombrePiso VARCHAR(50)
);
-- LLAVE PRIMARIA DE PISO
ALTER TABLE PISO ADD PRIMARY KEY (DireccionPiso);



-- :::::::::::::::TABLA CLIENTE:::::::::::::::
CREATE TABLE CLIENTE (
	NombreCl VARCHAR(50) UNIQUE,
	PersonaContactoCl VARCHAR(50),
	DireccionFacturacion VARCHAR(100),
	Ciudad VARCHAR(20),
	Estado VARCHAR(20),
	CodPostal VARCHAR(10),
	Pais VARCHAR(20),
	Telefono VARCHAR(20),
	Correo VARCHAR(45)
);
-- LLAVE PRIMARIA DE CLIENTE
ALTER TABLE CLIENTE ADD PRIMARY KEY (NombreCl);



-- :::::::::::::::TABLA USUARIO:::::::::::::::
CREATE TABLE USUARIO (
	NomUsuario VARCHAR(20) UNIQUE,
	Contra VARCHAR(20),
	Nombre VARCHAR(20),
	ApPaterno VARCHAR(20),
	ApMaterno VARCHAR(20),
	Correo VARCHAR(45),
	Telefono VARCHAR(20),
	HospitalSede VARCHAR(20)
);
-- LLAVE PRIMARIA DE USUARIO
ALTER TABLE USUARIO ADD PRIMARY KEY (NomUsuario);



-- :::::::::::::::TABLA EQUIPO:::::::::::::::
CREATE TABLE EQUIPO (
	Codigo VARCHAR(10) UNIQUE,
	Equipo CHAR(50),
	Departamento VARCHAR(20),
	Area VARCHAR(20),
	CostoCompra DECIMAL(5,2),
	PrecioVenta DECIMAL(5,2),
	Modelo VARCHAR(20),
	Serie VARCHAR(20),
	Piso VARCHAR(10),
	Cantidad INT,
	FechaSolicitud DATE,
	FechaRecibo DATE,
	FechaInstalacion DATE,
	Proveedor VARCHAR(40)
);
-- LLAVE PRIMARIA DE EQUIPO
ALTER TABLE EQUIPO ADD PRIMARY KEY (Codigo);
-- LLAVES FORÁNEAS DE EQUIPO
ALTER TABLE equipo ADD CONSTRAINT eqFK1 FOREIGN KEY (departamento) REFERENCES departamento (nombre) ON UPDATE CASCADE;
ALTER TABLE equipo ADD CONSTRAINT eqFK2 FOREIGN KEY (area) REFERENCES departamento (area) ON UPDATE CASCADE;
ALTER TABLE equipo ADD CONSTRAINT eqFK3 FOREIGN KEY (piso) REFERENCES piso (direccionpiso) ON UPDATE CASCADE;
ALTER TABLE equipo ADD CONSTRAINT eqFK4 FOREIGN KEY (proveedor) REFERENCES proveedor (nombrepr) ON UPDATE CASCADE;



-- :::::::::::::::TABLA PEDIDO:::::::::::::::
CREATE TABLE PEDIDO (
	NoPedido INT,
	FechaRecibo DATE,
	FechaEmision DATE,
	NoSeguimiento VARCHAR(20),
	OpPaq VARCHAR(20),
	CodEquipo VARCHAR(10),
	Proveedor VARCHAR(40),
	Piso VARCHAR(10),
	CantidadSol INT
);
ALTER TABLE PEDIDO MODIFY NoPedido INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6532;
-- LLAVE PRIMARIA DE PEDIDO
ALTER TABLE PEDIDO ADD PRIMARY KEY (NoPedido,CodEquipo);
-- LLAVES FORÁNEAS DE PEDIDO
ALTER TABLE PEDIDO ADD CONSTRAINT peFK1 FOREIGN KEY (CodEquipo) REFERENCES EQUIPO (Codigo) ON UPDATE CASCADE;
ALTER TABLE PEDIDO ADD CONSTRAINT peFK2 FOREIGN KEY (Proveedor) REFERENCES PROVEEDOR (NombrePr) ON UPDATE CASCADE;
ALTER TABLE PEDIDO ADD CONSTRAINT peFK3 FOREIGN KEY (Piso) REFERENCES PISO (DireccionPiso) ON UPDATE CASCADE;



-- :::::::::::::::TABLA TRANSFERENCIA:::::::::::::::
CREATE TABLE TRANSFERENCIA (
	NoTrans VARCHAR(20) UNIQUE,
	CodEquipo VARCHAR(10),
	UbicOrigen VARCHAR(10),
	UbicNva VARCHAR(10),
	CantidadTrans INT,
	FechaSol DATE,
	UsuarioSol VARCHAR(20),
	FechaEnvia DATE,
	UsuarioEnvia VARCHAR(20),
	FechaRecibo DATE,
	UsuarioRecibe VARCHAR(20),
	Estado VARCHAR(10)
);
-- LLAVE PRIMARIA DE TRANSFERENCIA
ALTER TABLE TRANSFERENCIA ADD PRIMARY KEY (NoTrans);
-- LLAVES FORÁNEAS DE TRANSFERENCIA
ALTER TABLE TRANSFERENCIA ADD CONSTRAINT trFK1 FOREIGN KEY (CodEquipo) REFERENCES EQUIPO (Codigo) ON UPDATE CASCADE;
ALTER TABLE TRANSFERENCIA ADD CONSTRAINT trFK2 FOREIGN KEY (UbicOrigen) REFERENCES PISO (DireccionPiso) ON UPDATE CASCADE;
ALTER TABLE TRANSFERENCIA ADD CONSTRAINT trFK3 FOREIGN KEY (UbicNva) REFERENCES PISO (DireccionPiso) ON UPDATE CASCADE;
ALTER TABLE TRANSFERENCIA ADD CONSTRAINT trFK4 FOREIGN KEY (UsuarioSol) REFERENCES USUARIO (NomUsuario) ON UPDATE CASCADE;
ALTER TABLE TRANSFERENCIA ADD CONSTRAINT trFK5 FOREIGN KEY (UsuarioEnvia) REFERENCES USUARIO (NomUsuario) ON UPDATE CASCADE;
ALTER TABLE TRANSFERENCIA ADD CONSTRAINT trFK6 FOREIGN KEY (UsuarioRecibe) REFERENCES USUARIO (NomUsuario) ON UPDATE CASCADE;


-- :::::::::::::::TABLA VENTAS:::::::::::::::
CREATE TABLE VENTA (
	NoVenta INTEGER UNIQUE,
	UsuarioVenta VARCHAR(20),
	ClienteCompra VARCHAR(50),
	FechaVenta DATE,
	CodEquipo VARCHAR(10)
);
-- LLAVE PRIMARIA DE VENTAS
ALTER TABLE VENTA MODIFY NoVenta INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6532;
ALTER TABLE VENTA ADD PRIMARY KEY (NoVenta,CodEquipo);
-- LLAVES FORÁNEAS DE VENTAS
ALTER TABLE VENTA ADD CONSTRAINT veFK1 FOREIGN KEY (UsuarioVenta) REFERENCES USUARIO (NomUsuario) ON UPDATE CASCADE;
ALTER TABLE VENTA ADD CONSTRAINT veFK2 FOREIGN KEY (ClienteCompra) REFERENCES CLIENTE (NombreCl) ON UPDATE CASCADE;
ALTER TABLE VENTA ADD CONSTRAINT veFK3 FOREIGN KEY (CodEquipo) REFERENCES EQUIPO (Codigo) ON UPDATE CASCADE;



-- :::::::::::::::VISTA PARA INFORME GENERAL:::::::::::::::
CREATE OR REPLACE VIEW informegeneral AS
	SELECT
		NombrePiso,
		Departamento,
		Codigo,
		Equipo,
		Cantidad,
		CostoCompra,
		PrecioVenta,
		Cantidad * CostoCompra AS TotalLinea
	FROM
		EQUIPO E INNER JOIN PISO P ON (E.Piso = P.DireccionPiso);

-- :::::::::::::::VISTA PARA INFORME POR PISO Y DEPARTAMENTO/AREA:::::::::::::::
-- Se necesita comparar los campos de Piso, Departamento y Área con los seleccionados en la aplicación
CREATE OR REPLACE VIEW informePisoDepa AS
	SELECT
		Codigo,
		Equipo,
		Cantidad,
		CostoCompra,
		Cantidad * CostoCompra AS TotalLinea,
		Piso,
		Departamento,
		Area
	FROM
		EQUIPO;



-- :::::::::::::::VISTA PARA INFORME POR PROVEEDOR:::::::::::::::
-- Se necesita comparar el campo de Proveedor con el seleccionado en la aplicación
CREATE VIEW informeProveedor AS
	SELECT
		Codigo,
		Equipo,
		Piso,
		Cantidad,
		CostoCompra,
		Cantidad * CostoCompra AS TotalLinea,
		Proveedor
	FROM
		EQUIPO;



-- :::::::::::::::VISTA PARA INFORME DE PEDIDOS PENDIENTES:::::::::::::::
CREATE OR REPLACE VIEW informePendientes AS
	SELECT
		NoPedido,
		CodEquipo,
		CantidadSol,
		P.Piso,
		CostoCompra,
		P.FechaRecibo
	FROM
		EQUIPO E INNER JOIN PEDIDO P ON E.Codigo = P.CodEquipo;


-- :::::::::::::::VISTA PARA INFORME DE VENTAS:::::::::::::::
-- Se necesita comparar el campo de FechaVenta con los seleccionados en la aplicación
CREATE OR REPLACE VIEW informeVentas AS
	SELECT
		Codigo,
		Equipo,
		CostoCompra,
		PrecioVenta,
		FechaVenta,
		Cantidad * CostoCompra AS CostoTotal,
		Cantidad * PrecioVenta AS VentaTotal,
		(Cantidad * CostoCompra) - (Cantidad * PrecioVenta) AS GananciaBruta
	FROM
		EQUIPO E INNER JOIN VENTA V ON E.Codigo = V.CodEquipo;
