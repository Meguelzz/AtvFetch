<?php
$counter_file = 'search_counter.json';

// Lê o contador atual (se existir)
$counters = [];
if (file_exists($counter_file)) {
    $counters = json_decode(file_get_contents($counter_file), true);
}

// Pega a cidade enviada pelo JavaScript
$city = $_POST['city'] ?? '';

if ($city) {
    // Incrementa o contador da cidade
    if (!isset($counters[$city])) {
        $counters[$city] = 0;
    }
    $counters[$city]++;
    
    // Salva no arquivo
    file_put_contents($counter_file, json_encode($counters));
    
    // Retorna os contadores atualizados (opcional)
    header('Content-Type: application/json');
    echo json_encode($counters);
}