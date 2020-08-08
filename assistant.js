var startBtn = document.createElement("button");
startBtn.innerHTML = "Start listening";
startBtn.id = "off";
var result = document.createElement("div");
var talkpart = document.createElement("div");
var processing = document.createElement("p");
document.body.append(startBtn);
document.body.append(processing);
document.body.append(result);
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
	startBtn.remove();
	result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
} else {
	var recognition = new SpeechRecognition();
	recognition.lang = "en-US";
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.onresult = event => {
		var last = event.results.length - 1;
		var res = event.results[last];
		var text = res[0].transcript;
		if (res.isFinal) {
			processing.innerHTML = "processing...";
			var response = process(text);
			var p = document.createElement("p");
			p.id = "talkpart";
			p.innerHTML = `<b>You:</b> ${text} </br><b>Milk Assistant</b>: ${response}`;
			processing.innerHTML = "";
			result.insertBefore(p, result.firstChild);
			var speaker = new SpeechSynthesisUtterance(response);
			speaker.lang = "en-US";
			speechSynthesis.speak(speaker);
		} else {
			processing.innerHTML = `listening: ${text}`;
		}
	}
	var listening = false;
	toggleBtn = () => {
		if (listening) {
			recognition.stop();
			startBtn.textContent = "Start";
			startBtn.id = "off";
		} else {
			recognition.start();
			startBtn.textContent = "Stop";
			startBtn.id = "on";
		}
		listening = !listening;
	};
	startBtn.addEventListener("click", toggleBtn);

}
function process(rawText) {
	var text = rawText.replace(/\s/g, "");
	text = text.toLowerCase();
	var response = null;
	switch(text) {
		case "hello":
		case "hi":
			response = random(["Hi, how are you?", "Hello!!!", "It's nice to see you"]); break;
		case "what'syourname":
		case "whoareyou":
			response = "No matter.";  break;
		case "howareyou":
		case "howareyoutoday":
			response = random(["I'm good. And you?", "I'm nice xD", "I feel good when I see you. So bad i'm blind..."]); break;
		case "whattimeisit":
		case "time":
			response = new Date(); break;
		case "i'mgood":
		case "i'mgreat":
		case "i'mwonderful":
			response = random(["Nice to hear it. Me too.", "You are good and it's good"]); break;
		case "i'mbad":
		case "i'mnotsogood":
		case "i'mverybad":
			response = random(["Oh! What happened?!", ":(", "Hopefully you'll be nice later :)"]); break;
		case "stop":
		case "bye":
		case "goodbye":
			response = random(["Bye!", "It was nice to see you. Goodbye", "See you later"]);
			toggleBtn();
	}
	if (!response) {
		window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
		return `Searching ${rawText} in Google`;
	}
	return response;
}
function random(arr){
	return arr[Math.floor(Math.random() * arr.length)];
}
