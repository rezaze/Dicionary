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
const voicePlay = $.getElementById("au");

searchBtn.addEventListener("click", () => {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord.value}`


    fetch(url)
        .then(response => response.json())
        .then(res => {

            setTimeout(() => {
                showDescription(res)
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
    let i = 0;
    /////create word

    let { audio, text } = item[0].phonetics[0];

    ///// create voice

    let { definition, example } = item[0].meanings[0].definitions[0]
    console.log(newWord);
    voicePlay.src = `${audio}`;

    voiceBtn.addEventListener("click", () => {
        fetch(audio)
            .then(res => {
                voicePlay.play();
            })
    });

    showWords.innerHTML = newWord;
    showText.innerHTML = text;
    console.log(example);

    if (!example) {
        example = "";
    }


    container.insertAdjacentHTML("beforeend", `
    <h3 id="definition" class="cen">Definition:<br>${definition}</h3> 
    <h3 id="example" class="cen">Example: <br>${example}</h3>
    `)


    searchWord.value = "";
    console.log(audio);
    console.log(item);

}
searchWord.addEventListener("keyup",
    e => e.keyCode === 13 && searchBtn.click()
)