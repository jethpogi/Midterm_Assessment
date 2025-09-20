<?php
include "../connection.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input) $input = $_POST;

    $id = trim($input["id"] ?? "");

    if ($id === "") {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Program ID is required"]);
        exit;
    }

    try {
        $sql = "DELETE FROM program_tbl WHERE Program_id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->execute([":id" => $id]);

        echo json_encode(["success" => true, "message" => "Program deleted successfully"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
