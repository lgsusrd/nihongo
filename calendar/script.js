const months_data = fetch("./months.json").then((response) => response.json());
const months_div = document.getElementById("months")

months_div.addEventListener('click', event => {
    if (playing) return;
    const clickedDiv = event.target.closest("div");
    audio(clickedDiv.id).play()
})

function load_months() {
    months_data.then((data) => {
        for (let index = 1; index <= 12; index++) {
            const months_obj = data.months[index];
            const div = document.createElement("div");
            const ruby = document.createElement("ruby");
            const numerical = months_obj.numerical_kanji
            div.className = "item"
            div.id = numerical
            const boolean = numerical.length >= 3
            var rt = document.createElement("rt");
            let number = boolean ? numerical.substring(0, 2) : numerical.charAt(0);
            rt.textContent = boolean ? months_obj.pronunciation[0] + months_obj.pronunciation[1] : months_obj.pronunciation[0]
            ruby.append(number)
            ruby.appendChild(rt)
            rt = document.createElement("rt");
            rt.textContent = months_obj.pronunciation[numerical.length - 1]
            ruby.append(numerical.charAt(numerical.length - 1))
            ruby.appendChild(rt)
            div.appendChild(ruby)
            months_div.appendChild(div)
        }
    })
}

var playing = false;
async function play_months() {
    if (playing) return;
    playing = true
    for (let item of months_div.children) {
        item.classList.add('play');
        await playAudio(item.id)
        await sleep(1000);
        item.classList.remove('play')
    }
    playing = false
}

const days_data = fetch("./days.json").then((response) => response.json());
const days_div = document.getElementById("days")

days_div.addEventListener('click', event => {
    if (playing) return;
    const clickedDiv = event.target.closest("div");
    audio(clickedDiv.id).play()
})

function load_days() {
    days_data.then((data) => {
        for (let index = 1; index <= 31; index++) {
            const days_obj = data.days[index];
            const div = document.createElement("div")
            const ruby = document.createElement("ruby")
            const numerical = days_obj.numerical_kanji
            div.className = "item"
            div.id = numerical
            const pronunciation = days_obj.pronunciation
            var rt = document.createElement("rt");
            rt.textContent = pronunciation.slice(0, pronunciation.length - 1).join('')
            ruby.append(numerical.substring(0, numerical.length - 1))
            ruby.appendChild(rt)
            rt = document.createElement("rt");
            rt.textContent = pronunciation.at(pronunciation.length - 1)
            ruby.append(numerical.charAt(numerical.length - 1))
            ruby.appendChild(rt)
            div.appendChild(ruby)
            days_div.appendChild(div)
        }
    })
}

function playAudio(txt) {
    return new Promise((resolve, reject) => {
        const audio_ = audio(txt)
        
        audio_.addEventListener('ended', resolve);
        
        audio_.addEventListener('error', () => {
          reject(new Error(`Error playing sound: ${txt}`));
        });
    
        audio_.play().catch(reject);
      });
}

function audio(txt) {
    return new Audio('audio/' + txt + '.mp3')
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

load_months()
load_days()