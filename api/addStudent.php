<?php
include "../connection.php"; 
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Try to read JSON
    $input = json_decode(file_get_contents("php://input"), true);

    // If JSON is empty, fallback to form POST
    if (!$input) {
        $input = $_POST;
    }

    $name = $input['name'] ?? '';
    $allowance = $input['allowance'] ?? '';

    if ( $name !== '' &&  $allowance !== '') {
        try {
            $sql = "INSERT INTO student_tbl ( Name, Allowance)
                    VALUES (:name, :allowance)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([
               
                ':name' => $name,
                ':allowance' => $allowance
            ]);

            echo json_encode(['success' => true, 'message' => 'Student added successfully']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
