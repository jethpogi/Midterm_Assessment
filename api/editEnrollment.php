<?php
include "../connection.php"; // $conn = new PDO(...)

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];              // load_id
$student_id = $data['student_id'];
$subject_id = $data['subject_id'];

try {
    // 1. Check for duplicates
    $check = $conn->prepare("SELECT * FROM student_load WHERE stud_id = ? AND Subject_id = ? AND load_id <> ?");
    $check->execute([$student_id, $subject_id, $id]);

    if ($check->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "This student is already enrolled in that subject"]);
        exit;
    }

    // 2. Update record
    $stmt = $conn->prepare("UPDATE student_load SET stud_id = ?, Subject_id = ? WHERE load_id = ?");
    if ($stmt->execute([$student_id, $subject_id, $id])) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update enrollment"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
