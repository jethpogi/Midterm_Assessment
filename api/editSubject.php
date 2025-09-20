<?php
include "../connection.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id']) || empty($data['name']) || empty($data['program_id']) || empty($data['sem_id'])) {
    echo json_encode(["success" => false, "message" => "Subject ID, name, program, and semester are required"]);
    exit;
}

try {
    $sql = "UPDATE subject_tbl 
            SET subject_name = :name, program_id = :program_id, sem_id = :sem_id
            WHERE subject_id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':program_id', $data['program_id'], PDO::PARAM_INT);
    $stmt->bindParam(':sem_id', $data['sem_id'], PDO::PARAM_INT);
    $stmt->bindParam(':id', $data['id'], PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
