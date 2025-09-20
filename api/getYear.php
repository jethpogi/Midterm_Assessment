<?php
include "../connection.php";
header("Content-Type: application/json");

try {
    $sql = "SELECT 
                year_tbl.year_id,
                year_tbl.year_from,
                year_tbl.year_to,
                semester_tbl.sem_id,
                semester_tbl.sem_name
            FROM year_tbl
            JOIN semester_tbl 
                ON year_tbl.year_id = semester_tbl.year_id
            ORDER BY year_tbl.year_id, semester_tbl.sem_id";

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
