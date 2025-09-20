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
                ON year_tbl.sem_id = semester_tbl.sem_id";

    $result = $conn->query($sql);

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
