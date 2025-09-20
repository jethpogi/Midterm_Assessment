<?php
include "../connection.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input) $input = $_POST;

    $id = trim($input["id"] ?? "");
    $name = trim($input["name"] ?? "");

    if ($id === "" || $name === "") {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "ID and Program name are required"]);
        exit;
    }

    try {
        $sql = "UPDATE program_tbl SET Program_name = :name WHERE Program_id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->execute([":name" => $name, ":id" => $id]);

        echo json_encode(["success" => true, "message" => "Program updated successfully"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
