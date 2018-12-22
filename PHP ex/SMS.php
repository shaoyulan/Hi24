<?php

$ch = curl_init('https://textbelt.com/text');
$data = array(
  'phone' => '5557727420',
  'message' => 'Hello world',
  'key' => 'textbelt',
);

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);


// key 
// 3435b6d8c3058e189f799099ddc6bd672fc2018awpIseCV66RBjL2qEYPeFSnTtq