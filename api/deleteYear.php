<?php
include "../connection.php";
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'])) {
        echo json_encode(["success" => false, "message" => "Year ID is required"]);
        exit;
    }

    try {
        $sql = "DELETE FROM year_tbl WHERE year_id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->execute([":id" => $data['id']]);

        echo json_encode(["success" => true, "message" => "Year deleted successfully"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
