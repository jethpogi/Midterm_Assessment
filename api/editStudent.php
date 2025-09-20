<?php
include "../connection.php";
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$id = $input['id'] ?? '';
$name = $input['name'] ?? '';
$allowance = $input['allowance'] ?? '';

if (!$id || !$name || $allowance === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields required']);
    exit;
}

try {
    $sql = "UPDATE student_tbl 
            SET Name = :name, Allowance = :allowance 
            WHERE Stud_id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':id' => $id,
        ':name' => $name,
        ':allowance' => $allowance
    ]);

    echo json_encode(['success' => true, 'message' => 'Student updated']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
