

//--------------------------------------
// https://micro-phonics.com/wip<script src="script.js"></script>/dsa/demo/web-speech-api-master/speech-color-changer/voicetile.html?quiz=pat

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

// --------------------------------------------------


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ quiz , quiz];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
<!--hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try '+ colorHTML + '.';
-->
hints.innerHTML =   quiz ;

 function speakit() {
	 //alert('howdy');
  recognition.start();
  console.log('Ready to receive a color command.');
}

<!-- document.body.onclick = function() { recognition.stop();  console.log('Ready to receive a word.');} 
-->

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var color = event.results[last][0].transcript;
  color = lowercase(color);
  diagnostic.textContent = 'Result received: ' + color + '.';
  alert('color is ' + color);
  var realwordis = quiz;
  alert ('realword is ' + realwordis);
  
 if  (realwordis == color) {alert('thats correct '); 
 var msg = new SpeechSynthesisUtterance("yes, that's correct , the word is " + quiz);     msg.lang = "en-GB";    window.speechSynthesis.speak(msg); } 
 else {alert('nope'); var msg = new SpeechSynthesisUtterance("sorry but that sounded like you said " + color);     msg.lang = "en-GB";    window.speechSynthesis.speak(msg);} 
 
  bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
 // checkword('pat');
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

function checkword(x)
{ 
//alert(x);
var realwordis = x;
  //if  (realwordis == color) {alert('thats correct ')} else {alert('nope')} 
 	}
	
	function lowercase(s) {
var res = s.toLowerCase();
  return res; }
  
  function sayit(me){
	  
var msg = new SpeechSynthesisUtterance("pat");     msg.lang = "en-GB";    window.speechSynthesis.speak(msg);

    }
	
