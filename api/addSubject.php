<?php
include "../connection.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['name']) || empty($data['program_name']) || empty($data['sem_name'])) {
    echo json_encode(["success" => false, "message" => "Subject name, program, and semester are required"]);
    exit;
}

try {
    $sql = "INSERT INTO subject_tbl (subject_name, program_id, sem_id) 
            VALUES (:name, :program_id, :sem_id)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':program_id', $data['program_id']);
    $stmt->bindParam(':sem_id', $data['sem_id']);
    $stmt->execute();

    echo json_encode(["success" => true, "id" => $conn->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
