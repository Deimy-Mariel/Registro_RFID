create database RegistroUniversidad;

create table Usuarios(
	ID_Usuario int primary key not null auto_increment,
    Nombre varchar(500) not null,
    Contrasena char(64) not null,
    Fecha_Registro datetime,
    Estado bit
); 

create table Persona(
	ID_Persona int primary key not null auto_increment,
    Nombre varchar(500),
    Apellido varchar (500),
    Matricula varchar(7),
    Recinto varchar(300)
);

create table Carrera(
	ID_Carrera int primary key not null auto_increment,
    Carrera varchar(500)
);

create table Materia(
	ID_Materia int primary key not null auto_increment,
    Materia varchar(500)
);

create table RFID(
	ID_RFID int primary key not null auto_increment,
    RFID varchar(500),
    Fecha_Activacion datetime,
    Fecha_Desactivacion datetime,
    Estado bit
);

create table Persona_VS_Carrera(
	ID_Persona_Carrera int primary key not null auto_increment,
    ID_Persona int,
    ID_Carrera int,
    foreign key (ID_Persona) references Persona(ID_Persona),
    foreign key (ID_Carrera) references Carrera(ID_Carrera)
);

create table Persona_VS_Materia(
	ID_Persona_Materia int primary key not null auto_increment,
    ID_Persona int,
    ID_Materia int,
    foreign key (ID_Persona) references Persona(ID_Persona),
    foreign key (ID_Materia) references Materia(ID_Materia)
);

create table Persona_VS_RFID(
	ID_Persona_RFID int primary key not null auto_increment,
    ID_Persona int,
    ID_RFID int,
    foreign key (ID_Persona) references Persona(ID_Persona),
    foreign key (ID_RFID) references RFID(ID_RFID)
);