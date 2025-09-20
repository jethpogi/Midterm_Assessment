<?php
include "../connection.php"; 
header("Content-Type: application/json");

// Debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $sql = "SELECT program_tbl.Program_id, program_tbl.Program_name,institute_tbl.ins_name 
     FROM program_tbl join institute_tbl on institute_tbl.ins_id = program_tbl.ins_id ORDER BY Program_id ASC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $programs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($programs) {
        echo json_encode($programs);
    } else {
        echo json_encode(["success" => false, "message" => "No programs found"]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
