<?php
include "../connection.php";

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "No data received"]);
    exit;
}

$id        = $data['id'] ?? null;
$year_from = $data['year_from'] ?? null;
$year_to   = $data['year_to'] ?? null;
$sem_name  = $data['sem_name'] ?? null;

try {
    if (!$id || !$year_from || !$year_to || !$sem_name) {
        echo json_encode(["success" => false, "message" => "Missing fields"]);
        exit;
    }

    // Update year_tbl
    $stmtYear = $conn->prepare("UPDATE year_tbl SET year_from = ?, year_to = ? WHERE year_id = ?");
    $stmtYear->execute([$year_from, $year_to, $id]);

    // Update semester_tbl
    $stmtSem = $conn->prepare("UPDATE semester_tbl SET sem_name = ? WHERE year_id = ?");
    $stmtSem->execute([$sem_name, $id]);

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
