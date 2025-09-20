<?php
include "../connection.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$name = trim($data["name"] ?? "");
$ins_id = $data["ins_id"] ?? null;

if ($name === "" || !$ins_id) {
    echo json_encode(["success" => false, "message" => "Program name and institute are required"]);
    exit;
}

try {
    $stmt = $conn->prepare("INSERT INTO program_tbl (Program_name, ins_id) VALUES (?, ?)");
    $stmt->execute([$name, $ins_id]);

    echo json_encode(["success" => true, "message" => "Program added successfully"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
