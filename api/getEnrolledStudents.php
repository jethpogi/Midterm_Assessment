<?php
include "../connection.php";

$sql = "
  SELECT sl.load_id AS enroll_id,
         s.Stud_id AS student_id,
         s.Name AS student_name,
         p.program_name AS program_name,
         sem.sem_name,
         sub.subject_name
  FROM student_load sl
  JOIN student_tbl s ON sl.stud_id = s.Stud_id
  JOIN program_tbl p ON s.Program_id = p.Program_id
  JOIN subject_tbl sub ON sl.Subject_id = sub.Subject_id
  JOIN semester_tbl sem ON sub.sem_id = sem.sem_id
  ORDER BY sl.load_id, sem.sem_name
";

$stmt = $conn->prepare($sql);
$stmt->execute();

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
?>
