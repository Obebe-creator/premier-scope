<?php
require_once __DIR__ . '/../src/response.php';
require_once __DIR__ . '/../src/routes.php';

handle_options();

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// health
if ($method === 'GET' && $path === '/health') {
  json_response(["ok" => true]);
}

// GET /matches
if ($method === 'GET' && $path === '/matches') {
  get_matches();
}

// GET /matches/{id}
if ($method === 'GET' && preg_match('#^/matches/(\d+)$#', $path, $m)) {
  get_match_detail((int)$m[1]);
}

// POST /analysis
if ($method === 'POST' && $path === '/analysis') {
  post_ai_analysis();
}

json_response(["error" => "NOT_FOUND", "path" => $path], 404);
