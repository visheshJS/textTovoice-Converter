const heading = document.getElementById('head');
        const regularText = "Text to Speech ";
        const converterText = "Converter"; // Word to be styled differently
        let index = 0;
        
        function typeWriter() {
            if (index < regularText.length) {
                heading.innerHTML += regularText.charAt(index); // Append regular text
                index++;
                setTimeout(typeWriter, 90); // Adjust typing speed here
            } else if (index < regularText.length + converterText.length) {
                heading.innerHTML += `<span class='underline-gap'>${converterText.charAt(index - regularText.length)}</span>`; // Append styled "Converter" text
                index++;
                setTimeout(typeWriter, 90); // Adjust typing speed here
            }
        }

        // Start the typing effect when the page loads
        window.onload = typeWriter;

        let speech = new SpeechSynthesisUtterance();
        let voices=[];

        let voiceSelect= document.querySelector("select");
        window.speechSynthesis.onvoiceschanged=()=>{
            voices=window.speechSynthesis.getVoices();
            speech.voice=voices[0];

            voices.forEach((voice,i)=>(voiceSelect.options[i]=new Option(voice.name,i)));
            
        };

        voiceSelect.addEventListener("change",()=>{
            speech.voice=voices[voiceSelect.value]
        })



        document.querySelector("button").addEventListener("click",()=>{
            speech.text= document.querySelector("textarea").value;
            window.speechSynthesis.speak(speech);
        });