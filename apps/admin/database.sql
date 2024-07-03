ep-rapid-mode-a5hp6ccx.us-east-2.aws.neon.tech
green_db
5432
green_db_owner
ruXV2i8EefmC

CREATE TABLE time (
  date TIMESTAMP PRIMARY KEY
);

CREATE TABLE recopilations (
  'recopilationId' INT PRIMARY KEY,
  name VARCHAR(30),
  description TEXT,
  'startDate' DATE,
  'endDate' DATE,
  'departmentEndDate' DATE
);

CREATE TABLE departments (
  'departmentId' INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  type VARCHAR(255)
);

CREATE TABLE indicators (
  'index' INT PRIMARY KEY,
  name VARCHAR(255),
  alias VARCHAR(255),
  'helpText' TEXT
);

CREATE TABLE categories (
  'categoryId' INT PRIMARY KEY,
  name VARCHAR(50),
  'helpText' TEXT
);

CREATE TABLE criteria (
  'criteriaId' INT,
  'indicatorIndex' INT,
  'subIndex' INT,
  name VARCHAR(255),
  alias VARCHAR(255),
  'helpText' TEXT,
  'requiresEvidence' BOOLEAN,
  PRIMARY KEY ('indicatorIndex', 'subIndex')
);

CREATE TABLE InformationCollection (
  ID INT PRIMARY KEY,
  Summary TEXT,
  'createAt' DATE
);

CREATE TABLE Evidences (
  'evidenceId' INT PRIMARY KEY,
  description TEXT,
  type ,
  'externalLink' TEXT,
  'fileLink' TEXT,
  UploadDate DATE,
  error TEXT
);

CREATE TABLE FACT_Answers (
  'answerId' INT PRIMARY KEY,
  'recopilationId' INT,
  'departmentId' INT,
  'categoryId' INT,
  'index' INT,
  'subIndex' INT,
  'collectionID' INT,
  'evidenceId' INT,
  wasRecommended BOOLEAN,
  FOREIGN KEY (TimeID) REFERENCES Time(ID),
  FOREIGN KEY ('recopilationId') REFERENCES recopilations('recopilationId'),
  FOREIGN KEY ('departmentId') REFERENCES departments ('departmentId'),
  FOREIGN KEY ('index') REFERENCES indicators ('index'),
  FOREIGN KEY ('criteriaId') REFERENCES criteria('criteriaId'),
  FOREIGN KEY ('categoryId') REFERENCES categories('categoryId'),
  FOREIGN KEY ('collectionID') REFERENCES InformationCollection(ID),
  FOREIGN KEY ('evidenceId') REFERENCES Evidences('evidenceId')
);
