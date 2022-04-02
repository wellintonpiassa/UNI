CREATE SCHEMA APK

CREATE TABLE APK.usuario(
	identificador SERIAL,
	nome VARCHAR(30),
	dataDeNascimento DATE,
	celular VARCHAR(15),
	e_mail VARCHAR(30),
	participacao_atletica VARCHAR(30),
	senha VARCHAR(65),
	CONSTRAINT pk_comum PRIMARY KEY(identificador),
	CONSTRAINT uk_comum UNIQUE(e_mail)
);

CREATE TABLE APK.organizador(
	usuario_id INT,
	CONSTRAINT fk_organizador FOREIGN KEY(usuario_id)
		REFERENCES APK.usuario(identificador)
		ON DELETE CASCADE,
	CONSTRAINT pk_organizador PRIMARY KEY(usuario_id)
);

CREATE TABLE APK.universitario(
	usuario_id INT,
	CONSTRAINT fk_universitario FOREIGN KEY(usuario_id)
		REFERENCES APK.usuario(identificador)
		ON DELETE CASCADE,
	CONSTRAINT pk_universitario PRIMARY KEY(usuario_id)
);

CREATE TABLE APK.evento(
	Nome VARCHAR(50),
	Cidade VARCHAR(50),
	Endereco VARCHAR(50),
	DataInicio TIMESTAMP,
	DataFim TIMESTAMP,
	N_Tickets INT,
	IdEvento SERIAL,
	Usuario_id INT NOT NULL,
	CONSTRAINT pk_evento PRIMARY KEY(IdEvento),
	CONSTRAINT fk_evento FOREIGN KEY(usuario_id)
		REFERENCES APK.organizador
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE APK.participa(
	usuario_id INT,
	evento_id INT,
	CONSTRAINT pk_participa PRIMARY KEY(evento_id,usuario_id),
	CONSTRAINT fk_participa_usuario FOREIGN KEY(usuario_id)
		REFERENCES APK.usuario(identificador)
		ON DELETE CASCADE,
	CONSTRAINT fk_participa_evento FOREIGN KEY(evento_id)
		REFERENCES APK.evento(IdEvento)
		ON DELETE CASCADE
);

