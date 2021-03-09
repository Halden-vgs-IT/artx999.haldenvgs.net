<?php
$cabin = $_GET["cabin"];
$holiday = $_GET["holiday"];
/* Opens and edits the JSON-file */
$file = file_get_contents('cabins.json');
$data = json_decode($file, true);
$data[$cabin]["Utleid"][$holiday] = true;

/* Send new data to the JSON-file */
$newJsonData = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents('cabins.json', $newJsonData);
