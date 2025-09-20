<?php
include "../connection.php";
header("Content-Type: application/json");

try {
    $sql = "SELECT ins_id, ins_name FROM institute_tbl ORDER BY ins_name ASC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rows);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
