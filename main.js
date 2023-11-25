let langOption=document.querySelectorAll('select');
let fromText=document.querySelector('.fromText');
let transText=document.querySelector('.toTranslate');
let fromVoice=document.querySelector('.from');
let toVoice=document.querySelector('.to');
let cpyBtn=document.querySelector('.bx-copy');
let countValue=document.querySelector('.code-length');
let exchangeLang=document.querySelector('.bx-transfer');





langOption.forEach((get,con)=>{
    for(let countryCode in language){
        let selected;
        if(con==0 && countryCode=="en_GB"){
            selected="selected";
        }
        // else if(con==1 && countryCode=="hi-IN"){
        //     selected="selected";
        // }
        else if(con==1 && countryCode=="bn-IN"){
            selected="selected";
        }
        let option=`<option value="${countryCode}">${language[countryCode]}</option>`;
        // console.log(option);
        get.insertAdjacentHTML('beforeend',option);
    }
})

fromText.addEventListener('input',function(){
    let content=fromText.value;
    fromContent=langOption[0].value;
    transContent=langOption[1].value;

    let translink=`https://api.mymemory.translated.net/get?q=${content}&langpair=${fromContent}|${transContent}`;

    fetch(translink).then(translate=>translate.json()).then(data=>{
        console.log(data);
        // fromContent
        transText.value=data.responseData.translatedText;
    })
})

fromVoice.addEventListener('click',function(){
    // console.log('icon clicked!');

    let fromTalk=new SpeechSynthesisUtterance(fromText.value);
    fromText.lang=langOption[0].value;
    speechSynthesis.speak(fromTalk);
})

toVoice.addEventListener('click',function(){
    // console.log('icon clicked!');

    let toTalk=new SpeechSynthesisUtterance(transText.value);
   toTalk.lang=langOption[1].value;
    speechSynthesis.speak(toTalk);
})

cpyBtn.addEventListener('click',function(){
    navigator.clipboard.writeText(transText.value);
})

fromText.addEventListener('keyup',function(){
    countValue.innerHTML=`${fromText.value.length}/5000`;
})

exchangeLang.addEventListener('click',function(){
    let tempText=fromText.value;
    fromText.value=transText.value;
    transText.value=tempText;

    let tempLang=langOption[0].value;
    langOption[0].value=langOption[1].value;
    langOption[1].value=tempLang;


})

