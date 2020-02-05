<?php
// Random filename
function NewGuid() { 
    $s = strtoupper(md5(uniqid(rand(),true))); 
    $guidText = 
        substr($s,0,8) . '-' . 
        substr($s,8,4) . '-' . 
        substr($s,12,4). '-' . 
        substr($s,16,4). '-' . 
        substr($s,20); 
    return $guidText;
}

// Collect all headers
$headers = getallheaders();

if ($headers["Content-Type"] == "application/json")
    $_POST = json_decode(file_get_contents("php://input"), true);

if(!empty($_POST['imgBase64Data'])) {
	$filename = NewGuid() . '.png';
	$data = $_POST['imgBase64Data'];

	list($type, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
	$data = base64_decode($data);
	
	file_put_contents('upload/img/' . $filename, $data);
	
	echo '{
		"status": true,
		"statusText": "saved",
		"filename": "' . $filename . '"
	}';
} else {
	echo '{
		"status": false,
		"error": "base64 data not specified"
	}';
}
?>