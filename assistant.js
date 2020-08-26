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
	result.innerHTML = "<b>Browser does not support Speech API. Please <a href=https://www.google.com/chrome>download latest chrome.</a><b>";
	console.error("Speech API not supported");
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
			processing.innerHTML = `Listening: ${text}`;
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
	var text = rawText.replace(/\s/g, "").replace(/\,/g, "").replace(/\./g, "").replace(/\!/g, "").replace(/\?/g, "").replace("-", "");
	text = text.toLowerCase();
	if(text.slice(0, 14) == "searchingoogle"){
		window.open(`http://google.com/search?q=${rawText.toLowerCase().replace("search in google", "")}`, "", "width=" + screen.availWidth + ",height=" + screen.availHeight);
		return `Searching ${rawText.toLowerCase().replace("search in google", "")} in Google.`;
	}
	if(text.slice(0, 6) == "search" || text.slice(0, 6) == "google"){
		window.open(`http://google.com/search?q=${rawText.toLowerCase().replace(text.slice(0, 6), "")}`, "", "width=" + screen.availWidth + ",height=" + screen.availHeight);
		return `Searching ${rawText.toLowerCase().replace(text.slice(0, 6), "")} in Google.`;
	}
	switch(text) {
		case "hello":
		case "hi":
			return random(["Hi, how are you?", "Hello!!!", "It's nice to see you"]);
		case "what'syourname":
		case "whoareyou":
			return "No matter.";
		case "howareyou":
		case "howareyoutoday":
		case "hellohowareyou":
		case "hellohowareyoutoday":
		case "hihowareyoutoday":
		case "hihowareyou":
			return random(["I'm good. And you?", "I'm nice xD", "I feel good when I see you. So bad i'm blind..."]);
		case "whattimeisit":
		case "time":
			return new Date();
		case "i'mgood":
		case "i'mgreat":
		case "i'mwonderful":
			return random(["Nice to hear it. Me too.", "You are good and it's good"]);
		case "flipacoin":
		case "coin":
			return random(["Heads", "Tails"]);
		case "rolladice":
		case "dice":
			return random(["One", "Two", "Three", "Four", "Five", "Six"]);
		case "i'mbad":
		case "i'mnotsogood":
		case "i'mverybad":
			return random(["Oh! What happened?!", ":(", "Hopefully you'll be nice later :)"]);
		case "openwhatsapp":
		case "whatsapp":
			window.open(`http://web.whatsapp.com/`, "", "width=" + screen.availWidth + ",height=" + screen.availHeight);
			return "Opened Whatsapp";
		case "openyoutube":
		case "youtube":
			window.open(`http://youtube.com/`, "", "width=" + screen.availWidth + ",height=" + screen.availHeight);
			return "Opened YouTube";
		case "openinstagram":
		case "instagram":
			window.open(`http://instagram.com/`, "", "width=" + screen.availWidth + ",height=" + screen.availHeight);
			return "Opened Instagram";
		case "openfacebook":
		case "facebook":
			window.open(`http://facebook.com/`, "", "width=" + screen.availWidth + ",height=" + screen.availHeight);
			return "Opened Facebook";
		case "openreddit":
		case "reddit":
			window.open(`http://reddit.com/`, "", "width=" + screen.availWidth + ",height=" + screen.availHeight);
			return "Opened Reddit";
		
		case "stop":
		case "bye":
		case "byebye":
		case "goodbye":
			toggleBtn();
			return random(["Bye!", "It was nice to see you. Goodbye", "See you later"]);
	}
	return random(["I don't understand you", "Try to say something else.", "I'm too stupid to answer this :("]) + " <a href=\"https://www.google.com/search?q=" + rawText.replace(" ", "+") + "\">Search in Web</a>";
}
function random(arr){
	return arr[Math.floor(Math.random() * arr.length)];
}
