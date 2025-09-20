<?php
include "../connection.php";
header("Content-Type: application/json");

try {
    // Get the POSTed JSON data
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['name']) || empty(trim($data['name']))) {
        echo json_encode([
            "success" => false,
            "message" => "Institute name is required"
        ]);
        exit;
    }

    $ins_name = trim($data['name']);

    // Insert into institutes table
    $stmt = $conn->prepare("INSERT INTO institute_tbl (ins_name) VALUES (:ins_name)");
    $stmt->bindParam(':ins_name', $ins_name);
    $stmt->execute();

    // Get the inserted ID
    $ins_id = $conn->lastInsertId();

    echo json_encode([
        "success" => true,
        "id" => $ins_id,
        "name" => $ins_name
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
