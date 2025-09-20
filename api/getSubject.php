<?php
include "../connection.php";
header("Content-Type: application/json");

try {
    $sql = "SELECT 
                subject_tbl.subject_id, 
                subject_tbl.subject_name, 
                semester_tbl.sem_name
            FROM subject_tbl
            LEFT JOIN semester_tbl 
                ON semester_tbl.sem_id = subject_tbl.sem_id
            LEFT JOIN year_tbl 
                ON year_tbl.year_id = semester_tbl.year_id";
    
    $stmt = $conn->query($sql);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rows);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
