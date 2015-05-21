/**
 * morseEncrypt.js
 * -- --- .-. ... . . -. -.-. .-. -.-- .--. - .-.-.- .--- ... 
 * Morse Code Encryption Bookmarklet.
 * Translates text you've entered on a web page's textarea into morse code.
 * If no text area is provided, this adds a blank on the page where you can
 * type your message and click "Encrypt" to turn it to morse code.
 * Tested on IE11, Chrome, and Firefox
 * Let me know what else it works/doesn't work with.
 */
(function () {
	"use strict";
	var d = document,
	x,
    translator = {// key/value pairs for translation to morse code
			A: ".-",
			B: "-...",
			C: "-.-.",
			D: "-..",
			E: ".",
			F: "..-.",
			G: "--.",
			H: "....",
			I: "..",
			J: ".---",
			K: "-.-",
			L: ".-..",
			M: "--",
			N: "-.",
			O: "---",
			P: ".--.",
			Q: "--.-",
			R: ".-.",
			S: "...",
			T: "-",
			U: "..-",
			V: "...-",
			W: ".--",
			X: "-..-",
			Y: "-.--",
			Z: "--..",
			"1": ".----",
			"2": "..---",
			"3": "...--",
			"4": "....-",
			"5": ".....",
			"6": "-....",
			"7": "--...",
			"8": "---..",
			"9": "----.",
			"0": "-----",
			",": "--..--",
			".": ".-.-.-",
			"?": "..--..",
            		"!": "---.",
			";": "-.-.-",
			":": "---...",
			"/": "-..-.",
			"-": "-....-",
			"&#39;": ".----.",
			"()": "-.--.-",
			"_": "..--.-",
			" ": "/"
		};
                    
	function morse() {	
        // replaces all textarea element contents with 
		// the equivalent in morse code.
		[].forEach.call(d.getElementsByTagName("textarea"), function (el) {
			var letters = el.value.toUpperCase().split("");
			el.value = letters.map(function (i) { return translator[i];}).join(" ");
		});	
	}
                    
    function decrypt() {
        var box = d.getElementById("box");
        if(box){
            var content = box.value.split(" ");
            box.value = "";
            content.forEach(function(el){
                for(var key in translator){
                    if(translator[key] === el){
                    box.value = box.value + key;
                    }
                }
            })
        }   
	}
	if (d.getElementsByTagName("textarea").length < 1) {// if there are no textareas...
		x = d.createElement("div");
        x.setAttribute("id", "morsediv");
		x.setAttribute("style", "height:50px;width:200px;position:fixed;top:0;right:0;z-index:9999;background:white;");
        x.innerHTML = "<textarea id=&#39;box&#39;></textarea><span id=&#39;closer&#39; title=&#39;Close Morse Encrypt&#39; style=&#39;cursor:pointer;position:absolute;left:-0.75em;top:0;background:lightgray;&#39;>X</span><button type=&#39;button&#39; id=&#39;morseEnc&#39;>Encrypt</button><button style=&#39;margin-left:1em;&#39; type=&#39;button&#39; id=&#39;morseDec&#39;>Decrypt</button>";
		d.body.appendChild(x);
        d.getElementById("morseEnc").onclick = morse;
        d.getElementById("morseDec").onclick = decrypt;
        d.getElementById("closer").onclick = function(){this.parentNode.parentNode.removeChild(d.getElementById("morsediv"))};
	} else {
		morse();// replaces all textarea contents with morse code.
	}
})();
