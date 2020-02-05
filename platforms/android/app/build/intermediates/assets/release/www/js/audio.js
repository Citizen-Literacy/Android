function sendFormData(form) {
	var file = form['audio_file'].files[0];
	console.log(file);
	const API_URL = 'receive_audio.php';
	
	var xmlhttp = new XMLHttpRequest();
	
	
	xmlhttp.upload.onprogress = function(event) {
		console.log(event.loaded + ' / ' + event.total);
	}
	
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            
            //Remove on prod
            console.log(response);

            if (response.status === true) {
                //success state				
				// Don't forget to remove class that we will not use anymore 
                document.getElementById("response-container").classList.remove("incorrect");
				// After that append new class (same thing but in reverse for 'fail state')
				document.getElementById("response-container").classList.add("correct");				
            } else {
                //fail state
                document.getElementById("response-container").classList.remove("correct");
				document.getElementById("response-container").classList.add("incorrect");				
            };
        }
    };
	
	
	var form_data = new FormData();  
	form_data.append('audio_file', file);
	xmlhttp.open("POST", API_URL, true);
	xmlhttp.send(form_data);
	
	// Do not submit form
	return false;
}