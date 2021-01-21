UPDATE
Person_Student
SET
school = (
SELECT
school
FROM
Person_Student_Loaded
WHERE
Person_Student.hcw_id = Person_Student_Loaded.hcw_id
)





INSERT INTO Person_Student
(
imported,
hcw_id,
given_name,
surname,
sex,
dob
)
SELECT
now(),
hcw_id,
first_names,
surname,
sex,
dob
FROM
Person_Student_Loaded
ORDER BY
HCW_ID ASC 


SELECT
surname, given_name, count(*) no_of_records
FROM CRC.Person_Caregiver
GROUP BY surname, given_name
HAVING count(*) > 1;
