const selectTag=document.querySelectorAll("select"),
toText=document.querySelector(".to-text"),
fromText=document.querySelector(".from-text"),
exchangeIcon=document.querySelector(".exchange"),
icons=document.querySelectorAll(".row i"),
translateBtn=document.querySelector(".trans"),
clearTextBtn=document.querySelector(".clear");

selectTag.forEach((tag,id) =>{
    for(const country_code in countries){
        // console.log(countries[country_code]);
        // selecting English by default as FROM language and Hindi as TO language
        let selected;
        if(id==0 && country_code=="en-GB"){
            selected="selected";
        }
        else if(id==1 && country_code=="hi-IN"){
            selected="selected";
        }
        let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);//adding option tag inside select tag
    }
});

exchangeIcon.addEventListener("click",()=>{
    //exchanging textarea and select tag values
    let tempText=fromText.value;
    let tempLang=selectTag[0].value;
    fromText.value=toText.value;
    selectTag[0].value=selectTag[1].value;
    toText.value=tempText;
    selectTag[1].value=tempLang;

})

translateBtn.addEventListener("click", ()=>{
    let text=fromText.value,
    translateFrom=selectTag[0].value, //getting fromSelect tag value
    translateTo=selectTag[1].value; //getting toselect tagvalue
    // console.log(text,translateFrom,translateTo);
    if(!text) return;
    toText.setAttribute("placeholder","Translating...");
    let apiurl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiurl).then(res=> res.json()).then(data=>{
        // console.log(data);
        toText.value=data.responseData.translatedText;
        toText.setAttribute("placeholder","Translation");
    })
})
clearTextBtn.addEventListener("click", ()=>{
    fromText.value="";
    toText.value="";
})
icons.forEach(icon=>{
    icon.addEventListener("click",function ({ target }) {
            // console.log(target);
            if (!fromText.value || !toText.value)
                return;
            if (target.classList.contains("fa-copy")) {
                if (target.id == "from") {
                    // console.log("From copy icon clicked");
                    navigator.clipboard.writeText(fromText.value);
                } else {
                    // console.log("To copy icon clicked");
                    navigator.clipboard.writeText(toText.value);
                }
            } else {
                // console.log("Speech icon clicked");
                let utterance;
                if (target.id == "from") {
                    utterance = new SpeechSynthesisUtterance(fromText.value);
                    utterance.lang = selectTag[0].value; //setting utterance language to fromSelect tag value
                } else {
                    // console.log("clicked");
                    utterance = new SpeechSynthesisUtterance(toText.value);
                    utterance.lang = selectTag[1].value; //setting utterance language to toSelect tag value
                }
                speechSynthesis.speak(utterance); //speak the passed utterance
            }
        });
})