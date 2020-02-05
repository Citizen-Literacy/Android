

var quiz= GetUrlValue('quiz'); // get ?quiz=whateverquiz
//alert(quiz);
	// grab this quiz string and make it 200 point text so folk see what word they have to say
	// replacign the images pf Pat
	function GetUrlValue(VarSearch)
	{
	var SearchString = window.location.search.substring(1);
	var VariableArray = SearchString.split('&');
	for(var i = 0; i < VariableArray.length; i++)
	{
		var KeyValuePair = VariableArray[i].split('=');
		if(KeyValuePair[0] == VarSearch){return KeyValuePair[1];}

	}
	}
console.log(quiz);
var quizsplit = quiz.split("");
console.log(quizsplit);
var ltr0= (quizsplit[0]);
var ltr1= (quizsplit[1]);
var ltr2= (quizsplit[2]);
var attr = ltr0 +" "+ ltr1 +" "+ ltr2 +" ";
console.log(attr);

var elmnt = document.getElementById("pressed");  
elmnt.getAttributeNode("data-valid").value = attr;
console.log("pressed value is " + attr);
var elmnt2 = document.getElementById("pressed2");  
elmnt2.getAttributeNode("data-valid").value = attr;
console.log("pressed2 value is " + attr);

// ------------------------
var audioClip = document.getElementById("myAudio");

function playme(x) {
    x.play();
}

function playAudio() {
    audioClip.play();
}

function pauseAudio() {
    audioClip.pause();
}

function postSelection(letter) {
	const API_URL = 'receive_selection.php';
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var response = JSON.parse(this.responseText);
            
            //Remove on prod
            console.log(response.status);

            if (response.status === true) {
                //success state
				
				var element = document.getElementById("response-correct-container");
                element.classList.remove("reverse-active");
                var element = document.getElementById("response-correct-wrapper");
                element.classList.remove("inactive");
                var element = document.getElementById("response-correct-container");
                element.classList.add("correct-active");
                var element = document.getElementById("response-correct-wrapper");
                element.classList.add("correct-wrapper");		
            } else {
                //fail state
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
	// Send async request 
    xmlhttp.open("POST", API_URL, true);
	// We want to send data as json
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	// post values
    xmlhttp.send(JSON.stringify( { selectedLetter: letter } ));
}


//----------------------
  function sayit(me){	  
var msg = new SpeechSynthesisUtterance(me);     msg.lang = "en-GB";    window.speechSynthesis.speak(msg);

    }
	