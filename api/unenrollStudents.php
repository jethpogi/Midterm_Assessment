<?php
include "../db.php"; // $conn = new PDO(...)

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id']; // load_id

try {
    $stmt = $conn->prepare("DELETE FROM student_load WHERE load_id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to unenroll student"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
