const week_data = fetch("./days_of_the_week.json").then((response) => response.json());
const kanji_element = document.getElementsByClassName("kanji")[0];
const english_element = document.getElementsByClassName("english-text")[0];

var counter = 0;
var current_audio;

function loadDay(i) {
    week_data.then((data) => {
        kanji_element.innerHTML = "";
        const rubyElement = document.createElement("ruby");
        const day = data[i];
        const kanji_chars = day.kanji.split("");
        for (let index = 0; index < kanji_chars.length; index++) {
            const rt = document.createElement("rt");
            rt.textContent = day.hiragana[index];
            rubyElement.append(kanji_chars[index]);
            rubyElement.appendChild(rt);
        }
        kanji_element.appendChild(rubyElement);
        english_element.textContent = day.english;
        current_audio = new Audio(
            "audio/" + (i + 1) + "." + day.kanji + ".mp3"
        );
        
    });
}

function previousDay() {
    if (counter <= 0) counter = 6;
    else counter--;
    loadDay(counter);
}

function nextDay() {
    counter = (counter + 1) % 7;
    loadDay(counter)
}

function loadCurrentDay() {
    counter = new Date(Date.now()).getDay();
    loadDay(counter);
}

function play_audio() {
    if (current_audio) 
        current_audio.play()
}

loadCurrentDay()
