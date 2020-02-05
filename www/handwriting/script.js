var quiz= GetUrlValue('quiz'); // get ?quiz=whateverquiz
 console.log(quiz);
	
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


  function sayit(me){	  
var msg = new SpeechSynthesisUtterance(me);     msg.lang = "en-GB";    window.speechSynthesis.speak(msg);

    }
	