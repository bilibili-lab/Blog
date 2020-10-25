SELECT
    id,
    name,
    idcard,
    age,
    city AS home
FROM
    student
WHERE
    city IS NULL
    OR city = ''