"use strict"

let $ = document;

const searchWord = $.getElementById("word"),
    searchBtn = $.querySelector(".search-bar"),
    voiceBtn = $.querySelector(".voice-bar"),
    showWords = $.getElementById("word-bar"),
    showText = $.getElementById("text"),
    showDefinition = $.getElementById("definition"),
    showExample = $.getElementById("example"),
    container = $.querySelector("#con")
const voicePlay = $.getElementById("au"),
    loadText = $.getElementById("load-text");

let load = null;
searchBtn.addEventListener("click", () => {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord.value}`

    loadingText();

    fetch(url)
        .then(response => response.json())
        .then(res => {

            setTimeout(() => {
                showDescription(res)
                loadText.innerHTML = "";
                clearInterval(load);
            }, 1000)

        })

})

function showDescription(item) {
    container.innerHTML = "";
    let { word } = item[0];
    let arrWord = word.split("");
    let getFirsetWord = arrWord[0].toUpperCase();
    arrWord.shift();
    let newWord = getFirsetWord + arrWord.join("")

    /////create word
    let { definition, example } = item[0].meanings[0].definitions[0]


    let { audio, text } = item[0].phonetics[0];
    if (!audio) {
        item[0].phonetics.forEach(e => {
            if (e.audio) {
                audio = e.audio;
            }
        })
    }


    voicePlay.src = `${audio}`;

    voiceBtn.addEventListener("click", () => {
        fetch(audio)
            .then(res => {
                voicePlay.play();
            })
    });

    showWords.innerHTML = newWord;
    showText.innerHTML = text;


    if (!example) {
        item[0].meanings[0].definitions.forEach(e => {
            if (e.example) {
                example = e.example;
            } else {
                example = "";
            }
        })
    }



    container.insertAdjacentHTML("beforeend", `
    <h3 id="definition" class="cen">Definition:<br>${definition}</h3> 
    <h3 id="example" class="cen">Example: <br>${example}</h3>
    `)


    searchWord.value = "";

}
searchWord.addEventListener("keyup",
    e => e.keyCode === 13 && searchBtn.click()
)

function loadingText() {
    loadText.innerHTML = "Loading..."
    load = setInterval(() => {
        loadText.innerHTML = loadText.innerHTML.slice(0, loadText.innerHTML.length - 1);

        if (loadText.innerHTML.length === 7) {
            loadText.innerHTML = `Loading...`;
        }
    }, 400)
}