<?php

if ( 0 < $_FILES['audio_file']['error'] ) {
	echo 'Error: ' . $_FILES['audio_file']['error'] . '<br>';
	echo '{
		"status": false,
		"error": "' . $_FILES['audio_file']['error'] . '"
	}';
}
else {
	move_uploaded_file($_FILES['audio_file']['tmp_name'], 'upload/audio/' . $_FILES['audio_file']['name']);
	echo '{
		"status": true,
		"name": "' . $_FILES['audio_file']['name'] . '",
		"type": "' . $_FILES['audio_file']['type']. '",		
		"size": "' . $_FILES['audio_file']['size']. '"
	}';
}
?>