-- Cria a tabela de usuários

CREATE TABLE User(
UserId INT NOT NULL,
Nome varchar(50),
Sobrenome varchar(50),
Email varchar(50),
Senha varchar(50),
Gestor varchar(50),
PRIMARY KEY(UserId)
);

-- Cria a tabela de bicicletas

CREATE TABLE Bicicleta(
BicicletaId int NOT NULL,
Criador int NOT NULL,
Modelo varchar(50),
Cor varchar(50),
Localidade varchar(50),
DataDeCriação timestamp,
PRIMARY KEY (BicicletaId),
FOREIGN KEY (Criador) REFERENCES User(UserId)
);

-- Cria a tabela de Reservas

CREATE TABLE Reserva(
ReservaId int NOT NULL,
Usuario int NOT NULL,
Bicicleta int NOT NULL,
Inicio date,
Fim date,
DataDeCriação timestamp,
PRIMARY KEY (ReservaId),
FOREIGN KEY (Usuario) REFERENCES User(UserId),
FOREIGN KEY (Bicicleta) REFERENCES Bicicleta(BicicletaId)
);

-- Adiciona tabela de Avaliação

CREATE TABLE Avaliacao(
Nota int NOT NULL,
PRIMARY KEY (UserId, BicicletaId),
FOREIGN KEY (UserId) REFERENCES User(UserId),
FOREIGN KEY (BicicletaId) REFERENCES Bicicleta(BicicletaId)
);
