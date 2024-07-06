-- TODO: Revisar si se puede optimizar la consulta y el añadido de la
-- dimensión tiempo
SELECT 
  ans.id AS "answerId",
  ans."recopilationId",
  ans."categoryId",
  ans."departmentId",
  ans."informationCollectionId",
  e.id AS "evidenceId",
  c."indicatorIndex",
  c."subIndex",
  CASE
    WHEN rec.id IS NOT NULL THEN TRUE
    ELSE FALSE
  END AS "wasRecommended"
FROM answers AS ans
INNER JOIN categorized_criterion AS cc ON
  ans."recopilationId" = cc."recopilationId" AND
  ans."categoryId" = cc."categoryId"
INNER JOIN criterion AS c ON
  cc."criteriaId" = c.id
INNER JOIN departments_per_recopilations AS dpr ON
  ans."recopilationId" = dpr."recopilationId" AND
  ans."departmentId" = dpr."departmentId"
LEFT JOIN evidences AS e ON
  ans."informationCollectionId" = e."collectionId"
LEFT JOIN recommendations AS rec ON
  dpr.id = rec."departmentPerRecopilationId" AND
  rec."categoryId" = ans."categoryId"