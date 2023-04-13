<?php
// Get symbols from POST request
$symbols = $_POST['symbols'];

// API endpoint URL
$url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=' . $symbols;

// API key
$apiKey = '8f24171d-7647-459f-b382-6e346887dbd0';

// Send request to API
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('X-CMC_PRO_API_KEY: ' . $apiKey));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
curl_close($curl);

// Send JSON response
header('Content-Type: application/json');
echo $response;
?>