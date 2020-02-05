<?php
// Correct letters (just an example)
$VALID_LETTERS = Array('s', 'i', 'n');

// Collect all headers
$headers = getallheaders();

if ($headers["Content-Type"] == "application/json")
    $_POST = json_decode(file_get_contents("php://input"), true);

if(!empty($_POST['selectedLetter'])) {
	$selectedLetter = $_POST['selectedLetter'];
	
	if(in_array($selectedLetter, $VALID_LETTERS)) {
		echo '{
			"status": true,
			"statusText": "valid letter"
		}';
	} else {
		echo '{
			"status": false,
			"statusText": "invalid letter !!!"
		}';
	}
} else {
	echo '{
		"status": false,
		"error": "selected letter is not specified"
	}';
}
?>