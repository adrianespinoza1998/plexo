CREATE DATABASE plexo_bd;
USE plexo_bd;

CREATE TABLE perfil_usuario(
	id_perfil INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre_perfil VARCHAR(255) NOT NULL
)ENGINE=INNODB;

CREATE TABLE empresa(
    id_empresa INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_empresa VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    nro_direccion INTEGER NOT NULL,
    telefono INTEGER NOT NULL
)ENGINE=INNODB;

CREATE TABLE usuario(
	id_usuario INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_perfil INTEGER NOT NULL,
	id_empresa INTEGER NOT NULL,
    correo VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rut INTEGER NOT NULL,
    dv CHAR,
    nombre VARCHAR(255) NOT NULL,
    ap_paterno VARCHAR(255) NOT NULL,
    ap_materno VARCHAR(255) NOT NULL,
	FOREIGN KEY (id_perfil)
	REFERENCES perfil_usuario(id_perfil)
	ON DELETE CASCADE,
	FOREIGN KEY (id_empresa)
    REFERENCES empresa(id_empresa)
)ENGINE=INNODB;

CREATE TABLE edificio(
	id_edificio INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_edificio VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    nro_direccion INTEGER NOT NULL,
    num_pisos INTEGER NOT NULL
)ENGINE=INNODB;

CREATE TABLE recinto(
	id_recinto INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_edificio INTEGER NOT NULL,
    nombre_recinto VARCHAR(255) NOT NULL,
    numero_piso INTEGER,
    FOREIGN KEY (id_edificio)
    REFERENCES edificio(id_edificio)
    ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE estancia(
	id_estancia INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_recinto INTEGER NOT NULL,
    nombre_estancia VARCHAR(255) NOT NULL,
    ncaja INTEGER NOT NULL,
	FOREIGN KEY(id_recinto)
    REFERENCES recinto(id_recinto)
    ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE recinto_proyecto(
    id_recinto_proyecto INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_recinto INTEGER NOT NULL,
    id_proyecto INTEGER NOT NULL,
    FOREIGN KEY(id_recinto)
    REFERENCES recinto(id_recinto)
    ON DELETE CASCADE,
    FOREIGN KEY (id_proyecto)
    REFERENCES proyectos(id_proyecto)
    ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE tipo_proyecto(
	id_tipo_proyecto INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre_tipo_proyecto VARCHAR(255) NOT NULL
)ENGINE=INNODB;

CREATE TABLE proyectos(
	id_proyecto INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_tipo_proyecto INTEGER NOT NULL,
	id_empresa INTEGER NOT NULL,
	id_administrador INTEGER NOT NULL,
    nombre_proyecto VARCHAR(255) NOT NULL,
    link_proyecto VARCHAR(255),
    id_edificio INTEGER NOT NULL,
    FOREIGN KEY(id_edificio)
    REFERENCES edificio(id_edificio)
    ON DELETE CASCADE,
	FOREIGN KEY(id_tipo_proyecto)
	REFERENCES tipo_proyecto(id_tipo_proyecto)
	ON DELETE CASCADE,
	FOREIGN KEY(id_administrador)
	REFERENCES usuario(id_usuario)
	ON DELETE CASCADE,
	FOREIGN KEY (id_empresa)
    REFERENCES empresa(id_empresa)
    ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE perfil_proyecto(
    id_perfil_proyecto INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(200) NOT NULL
)ENGINE=INNODB;

CREATE TABLE permisos_proyecto(
    id_permiso INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_proyecto INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    id_perfil_proyecto INTEGER,
    id_administrador INTEGER NOT NULL,
    FOREIGN KEY(id_proyecto)
    REFERENCES proyectos(id_proyecto)
    ON DELETE CASCADE,
    FOREIGN KEY (id_usuario)
    REFERENCES usuario(id_usuario)
    ON DELETE CASCADE,
    FOREIGN KEY (id_perfil_proyecto)
    REFERENCES perfil_proyecto(id_perfil_proyecto)
    ON DELETE CASCADE,
    FOREIGN KEY (id_administrador)
    REFERENCES proyectos(id_administrador)
    ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE categoria(
	id_categoria INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(255) NOT NULL
)ENGINE=INNODB;

CREATE TABLE elemento(
	id_elemento INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_estancia INTEGER NOT NULL,
    id_categoria INTEGER NOT NULL,
    propiedades VARCHAR(255) NOT NULL,
    FOREIGN KEY(id_categoria)
    REFERENCES categoria(id_categoria)
    ON DELETE CASCADE,
    FOREIGN KEY (id_estancia)
    REFERENCES estancia(id_estancia)
    ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE propiedades_elemento(
	id_prop_elemento INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_proyecto INTEGER NOT NULL,
    piso INTEGER NOT NULL,
    mesh VARCHAR(255) NOT NULL,
    id_elemento INTEGER NOT NULL,
    valor VARCHAR(255),
    FOREIGN KEY(id_proyecto)
    REFERENCES proyectos(id_proyecto)
    ON DELETE CASCADE,
    FOREIGN KEY(id_elemento)
    REFERENCES elemento(id_elemento)
    ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE estado(
	id_estado INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(255) NOT NULL
)ENGINE=INNODB;

CREATE TABLE mantenciones(
    id_mantencion INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_prop_elemento INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    id_estado INTEGER NOT NULL,
    fecha_mantencion DATE NOT NULL,
    FOREIGN KEY (id_prop_elemento)
    REFERENCES propiedades_elemento(id_prop_elemento)
    ON DELETE CASCADE,
    FOREIGN KEY (id_usuario)
    REFERENCES usuario(id_usuario)
    ON DELETE CASCADE,
    FOREIGN KEY (id_estado)
    REFERENCES estado(id_estado)
    ON DELETE CASCADE
)ENGINE=INNODB;

INSERT INTO tipo_proyecto VALUES(0,'Habitacional');
INSERT INTO tipo_proyecto VALUES(0,'Oficina');
INSERT INTO tipo_proyecto VALUES(0,'Clinica');
INSERT INTO tipo_proyecto VALUES(0,'Casas');
INSERT INTO tipo_proyecto VALUES(0,'Casino');
INSERT INTO tipo_proyecto VALUES(0,'Universidades');
INSERT INTO tipo_proyecto VALUES(0,'Colegios');

INSERT INTO perfil_usuario VALUES(0,'administrador de sistema');
INSERT INTO perfil_usuario VALUES(0,'usuario estandar');

INSERT INTO empresa VALUES(0,'Simioslab','Augusto Leguia Sur',79,228979690);

INSERT INTO usuario VALUES(0,1,1,'admin@simioslab.com','admin',1000000,0,'administrador','sistemas','simioslab');

INSERT INTO perfil_proyecto VALUES (0,'Coordinador');
INSERT INTO perfil_proyecto VALUES (0,'Especialista');
INSERT INTO perfil_proyecto VALUES (0,'Obra');
INSERT INTO perfil_proyecto VALUES (0,'Externo');
INSERT INTO perfil_proyecto VALUES (0,'Gerente');
INSERT INTO perfil_proyecto VALUES (0,'Indefinido');

