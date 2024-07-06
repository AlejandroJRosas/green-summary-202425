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
  "createAt" DATE,
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
  error TEXT
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

-- SELECT 
--   ans.id AS "answerId",
--   ans."recopilationId",
--   ans."categoryId",
--   ans."departmentId",
--   ans."informationCollectionId",
--   e.id AS "evidenceId",
--   c."indicatorIndex",
--   c."subIndex",
--   CASE
--     WHEN rec.id IS NOT NULL THEN TRUE
--     ELSE FALSE
--   END AS "wasRecommended"
-- FROM answers AS ans
-- INNER JOIN categorized_criterion AS cc ON
--   ans."recopilationId" = cc."recopilationId" AND
--   ans."categoryId" = cc."categoryId"
-- INNER JOIN evidences AS e ON
--   ans."informationCollectionId" = e."collectionId"
-- INNER JOIN criterion AS c ON
--   cc."criteriaId" = c.id
-- INNER JOIN departments_per_recopilations AS dpr ON
--   ans."recopilationId" = dpr."recopilationId" AND
--   ans."departmentId" = dpr."departmentId"
-- LEFT JOIN recommendations AS rec ON
--   dpr.id = rec."departmentPerRecopilationId" AND
--   rec."categoryId" = ans."categoryId"
