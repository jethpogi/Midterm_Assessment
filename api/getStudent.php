<?php
include "../connection.php";

$sql = "SELECT student_tbl.Stud_id, student_tbl.Name, program_tbl.Program_id, student_tbl.Allowance
        FROM student_tbl
        LEFT JOIN program_tbl ON student_tbl.Program_id = program_tbl.Program_id";

$stmt = $conn->query($sql);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($rows);
