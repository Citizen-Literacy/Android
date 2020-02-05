<?php
if ( 0 < $_FILES['voice_file']['error'] ) {
	echo 'Error: ' . $_FILES['voice_file']['error'] . '<br>';
	echo '{
		"status": false,
		"error": "' . $_FILES['voice_file']['error'] . '"
	}';
}
else {
	$filename = $_FILES['voice_file']['name'] . ".voice";
	move_uploaded_file($_FILES['voice_file']['tmp_name'], 'upload/voice/' . $filename);
	echo '{
		"status": true,
		"name": "' . $filename . '",
		"type": "' . $_FILES['voice_file']['type']. '",		
		"size": "' . $_FILES['voice_file']['size']. '"
	}';
}
?>