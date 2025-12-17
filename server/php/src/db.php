<?php
function db(): PDO {
  $host = getenv('DB_HOST') ?: '127.0.0.1';
  $name = getenv('DB_NAME') ?: 'premierscope';
  $user = getenv('DB_USER') ?: 'app';
  $pass = getenv('DB_PASS') ?: 'apppass';

  $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
  return new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);
}
