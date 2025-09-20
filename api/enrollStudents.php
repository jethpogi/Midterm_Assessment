<?php
include "../connection.php";

$data = json_decode(file_get_contents("php://input"), true);

$student_id = $data['student_id'];
$subject_id = $data['subject_id'];

try {
    // 1. Check for duplicate
    $check = $conn->prepare("SELECT * FROM student_load WHERE stud_id = ? AND Subject_id = ?");
    $check->execute([$student_id, $subject_id]);

    if ($check->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "Student already enrolled in this subject"]);
        exit;
    }

    
    $stmt = $conn->prepare("INSERT INTO student_load (stud_id, Subject_id) VALUES (?, ?)");
    if ($stmt->execute([$student_id, $subject_id])) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to enroll student"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
