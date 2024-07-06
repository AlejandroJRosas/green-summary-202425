BEGIN;

CREATE TABLE time (
  tiempo timestamp PRIMARY KEY
);

CREATE TABLE recopilations (
  "recopilationId" INT PRIMARY KEY,
  name TEXT,
  description TEXT,
  "startDate" DATE,
  "endDate" DATE,
  "departmentEndDate" DATE,
  "isReady" BOOLEAN
);

CREATE TABLE departments (
  "departmentId" INT PRIMARY KEY,
  name TEXT,
  email TEXT
);

CREATE TABLE indicators (
  "index" INT PRIMARY KEY,
  name TEXT,
  alias TEXT,
  "helpText" TEXT
);

CREATE TABLE categories (
  "indicatorIndex" INT,
  "categoryId" INT,
  name TEXT,
  "helpText" TEXT,
  PRIMARY KEY ("indicatorIndex", "categoryId")
);

CREATE TABLE criteria (
  "criteriaId" INT,
  "indicatorIndex" INT,
  "subIndex" INT,
  name TEXT,
  alias TEXT,
  "helpText" TEXT,
  "requiresEvidence" BOOLEAN,
  PRIMARY KEY ("indicatorIndex", "subIndex")
);

CREATE TABLE "informationCollection" (
  "collectionId" INT PRIMARY KEY,
  name TEXT,
  summary TEXT,
  "createdAt" DATE,
  "recopilationId" INT,
  "departmentId" INT,
  "categoryId" INT
);

CREATE TABLE evidences (
  "evidenceId" INT PRIMARY KEY,
  description TEXT,
  type VARCHAR(32),
  "externalLink" TEXT,
  "fileLink" TEXT,
  "createdAt" DATE,
  error TEXT,
  "collectionId" INT
);

CREATE TABLE answers (
  "answerId" INT PRIMARY KEY,
  "recopilationId" INT,
  "departmentId" INT,
  "categoryId" INT,
  "collectionId" INT,
  "index" INT,
  "indicatorIndex" INT,
  "subIndex" INT,
  "evidenceId" INT,
  tiempo timestamp,
  wasRecommended BOOLEAN,
  FOREIGN KEY (tiempo) REFERENCES time (tiempo),
  FOREIGN KEY ("recopilationId") REFERENCES recopilations("recopilationId"),
  FOREIGN KEY ("departmentId") REFERENCES departments ("departmentId"),
  FOREIGN KEY ("index") REFERENCES indicators ("index"),
  FOREIGN KEY ("indicatorIndex", "subIndex") REFERENCES criteria("indicatorIndex", "subIndex"),
  FOREIGN KEY ("indicatorIndex", "categoryId") REFERENCES categories("indicatorIndex", "categoryId"),
  FOREIGN KEY ("collectionId") REFERENCES "informationCollection"("collectionId"),
  FOREIGN KEY ("evidenceId") REFERENCES evidences ("evidenceId")
);

COMMIT;
