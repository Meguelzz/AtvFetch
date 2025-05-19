<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cidade = file_get_contents('php://input');
    $_SESSION['historico'][] = [
        'cidade' => $cidade,
        'data' => date('d/m/Y H:i')
    ];
    echo json_encode($_SESSION['historico']);
    exit;
}

if (isset($_GET['limpar'])) {
    unset($_SESSION['historico']);
    echo json_encode([]);
    exit;
}

echo json_encode($_SESSION['historico'] ?? []);
