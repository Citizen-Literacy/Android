window.addEventListener('load', function() {
	const API_URL = 'receive_voice.php';
	const TIMEOUT = 3000; // 3 seconds
	
	var recordButton = document.getElementById('record');	
	
	try {
		const audioConstraints = {audio: true, video: false};
		//let chunks = [];
		
		// Cross platform UserMedia
		navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
		var mediaRecorder;
		
		var handleSuccess = function(stream) {
			console.log('Success');
			
			// Find mimeType that can be used for this browser
			var options;
			if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
				options = {mimeType: 'audio/webm;codecs=opus'};
			} else if(MediaRecorder.isTypeSupported('audio/webm')) {
				options = {mimeType: 'audio/webm'};
			} else if(MediaRecorder.isTypeSupported('audio/webm;codecs=pcm')) {
				options = {mimeType: 'audio/webm;codecs=pcm'};
			} else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
				options = {mimeType: 'audio/ogg;codecs=opus'};
			}
			else { throw "Unsuported media type"; }
			
			console.log("Options: ", options);
			
			mediaRecorder = new MediaRecorder(stream, options);
			
			recordButton.onclick = function() {
				mediaRecorder.start();
				recordButton.disabled = true;
				
				document.getElementById("left-load").classList.add("left-load-block-animation");
				document.getElementById("right-load").classList.add("right-load-block-animation");
				
				setTimeout(function () {
					mediaRecorder.stop();
				}, TIMEOUT);
			}
			
			mediaRecorder.ondataavailable = function(e) {
				chunks.push(e.data);
				console.log(e);
			}
			
			
			mediaRecorder.onstop = function(e) {
				recordButton.disabled = false;
				document.getElementById("left-load").classList.remove("left-load-block-animation");
				document.getElementById("right-load").classList.remove("right-load-block-animation");

				var blob = new Blob(chunks, { 'type' : options.mimeType });
				chunks = [];
				
				var audioURL = ( window.URL || window.webkitURL ).createObjectURL(blob);

				// Create AJAX request and upload voice file to remote server
				// Create filename
				var newDate = new Date();
				var filename = "voice_" + newDate.toISOString().slice(0, 19).replace('T', '_').replace(':', '_').replace(':', '_');
				
				// Create and execute ajax request 
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						console.log(this.responseText);
						var response = JSON.parse(this.responseText);
					   
						// To Remove on prod
						console.log(response.status);

						if (response.status === true) {
							console.log("Save Ok. Filename: " + response.name)
							
							var element = document.getElementById("response-correct-container");
							element.classList.remove("reverse-active");
							var element = document.getElementById("response-correct-wrapper");
							element.classList.remove("inactive");
							var element = document.getElementById("response-correct-container");
							element.classList.add("correct-active");
							var element = document.getElementById("response-correct-wrapper");
							element.classList.add("correct-wrapper");
							
						} else {
							//show try again
							console.log(response.error);
							var element = document.getElementById("response-incorrect-container");
							element.classList.remove("reverse-active");
							var element = document.getElementById("response-incorrect-wrapper");
							element.classList.remove("inactive");
							var element = document.getElementById("response-incorrect-container");
							element.classList.add("incorrect-active");
							var element = document.getElementById("response-incorrect-wrapper");
							element.classList.add("incorrect-wrapper");
						};
					}
				};
				// Make an form data object and send them to remote server
				var formData = new FormData();
				formData.append("voice_file", blob, filename);
				xmlhttp.open("POST", API_URL, true);
				xmlhttp.send(formData);

				console.log(blob);
			}
			
		};

		function handleError(error) {
			console.log('err callback: ', error);
		}
		
		
		navigator.mediaDevices.getUserMedia({ audio: true, video: false })
			.then(handleSuccess)
			.catch(handleError);
			
	} catch(err) {
		console.log(e);
		alert('Oops.. Your browser do not support audio API');
	}
			
}, false);