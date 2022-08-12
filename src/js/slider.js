const pets = document.querySelectorAll('.pet')
let SLIDER = document.querySelector('.slider')

let pageList = []
let page = []


let wrapperArray = []
function createArray(coutPage,countElem) {
    for(let i = 0; i < coutPage ; i++){
        for(j =0 ; j < countElem ; j++){
            let rand = Math.floor(Math.random()*8)
            while((page.indexOf(rand) != -1)|(wrapperArray.indexOf(rand) != -1)){
                rand = Math.floor(Math.random()*8)
            }
            page.push(rand)
            wrapperArray.push(rand)
            if(wrapperArray.length == 8){
                wrapperArray = []
            }
        }
        pageList.push(page)
        page=[]
    }
    wrapperArray = []
}

function createPaginationPetTemplate (page, allPets){
    SLIDER.innerHTML = ''
     for(let i = 0; i < page.length; i++){
        let obj = allPets[page[i]]
        SLIDER.innerHTML += `
            <div class="slider__card pet pet-modal add__animate" data-name="${obj.name}">
                <div class="slider__card_img">
                    <img src="src/images/pets/${obj.img}" class="pet-modal" alt="${obj.name}" data-name="${obj.name}">
                </div>
                <div class="slider__card_name pet-modal" data-name="${obj.name}">
                    ${obj.name}
                </div>
                <button class="button button__white pet-modal" data-name="${obj.name}">
                    Learn more
                </button>
            </div>
        `
    }
}

let p = 0

window.addEventListener('load', ()=>{
    if(window.innerWidth >= 1280){
        createArray(6, 8)
        createPaginationPetTemplate(pageList[p], array)
    }
    if(window.innerWidth<1280 && window.innerWidth >= 768){
        createArray(8, 6)
        createPaginationPetTemplate(pageList[p], array)
    }
    if(window.innerWidth<768){
        createArray(16, 3)
        createPaginationPetTemplate(pageList[p], array)
    }
})

const FIRST_BTN = document.querySelector('#go-first')
const PREV_BTN = document.querySelector('#prev')
const CURRENT_BTN = document.querySelector('#current-page')
const NEXT_BTN = document.querySelector('#next')
const LAST_BTN = document.querySelector('#go-last')

const unDisabledPrev = () => {
    if(FIRST_BTN.classList.contains('button__disabled')){
        FIRST_BTN.classList.remove('button__disabled')
        FIRST_BTN.disabled = false
        PREV_BTN.classList.remove('button__disabled')
        PREV_BTN.disabled = false
    }
}

const unDisabledNext = () => {
    if(LAST_BTN.classList.contains('button__disabled')){
        LAST_BTN.classList.remove('button__disabled')
        LAST_BTN.disabled = false
        NEXT_BTN.classList.remove('button__disabled')
        NEXT_BTN.disabled = false
    }
}

const disabledNext = () => {
    if(p==pageList.length-1){
        LAST_BTN.classList.add('button__disabled')
        LAST_BTN.disabled = true
        LAST_BTN.removeEventListener('click', goLast)
        NEXT_BTN.classList.add('button__disabled')
        NEXT_BTN.disabled = true
        NEXT_BTN.removeEventListener('click', goNext)
    }
}

const disabledPrev = () => {
    if(p==0){
        FIRST_BTN.classList.add('button__disabled')
        FIRST_BTN.disabled = true
        FIRST_BTN.removeEventListener('click', goLast)
        PREV_BTN.classList.add('button__disabled')
        PREV_BTN.disabled = true
        PREV_BTN.removeEventListener('click', goNext)
    }
}

const goNext = () =>{
    NEXT_BTN.removeEventListener('click', goNext)
    PREV_BTN.removeEventListener('click', goPrev)
    LAST_BTN.removeEventListener('click', goLast)
    FIRST_BTN.removeEventListener('click', goFirst)
    SLIDER.classList.remove('add__animate')
    SLIDER.classList.add('remove__animate')
    p++
    CURRENT_BTN.innerHTML = p+1

    unDisabledPrev()
    disabledNext()
}

const goPrev = () => {
    NEXT_BTN.removeEventListener('click', goNext)
    PREV_BTN.removeEventListener('click', goPrev)
    LAST_BTN.removeEventListener('click', goLast)
    FIRST_BTN.removeEventListener('click', goFirst)
    SLIDER.classList.remove('add__animate')
    SLIDER.classList.add('remove__animate')
    p--
    CURRENT_BTN.innerHTML = p+1

    unDisabledNext()
    disabledPrev()
}

const goLast = ()=> {
    NEXT_BTN.removeEventListener('click', goNext)
    PREV_BTN.removeEventListener('click', goPrev)
    LAST_BTN.removeEventListener('click', goLast)
    FIRST_BTN.removeEventListener('click', goFirst)
    SLIDER.classList.remove('add__animate')
    SLIDER.classList.add('remove__animate')
    p = pageList.length-1
    CURRENT_BTN.innerHTML = p+1
    unDisabledPrev()
    disabledNext()
}

const goFirst = () => {
    NEXT_BTN.removeEventListener('click', goNext)
    PREV_BTN.removeEventListener('click', goPrev)
    LAST_BTN.removeEventListener('click', goLast)
    FIRST_BTN.removeEventListener('click', goFirst)
    SLIDER.classList.remove('add__animate')
    SLIDER.classList.add('remove__animate')
    p = 0
    CURRENT_BTN.innerHTML = p+1
    unDisabledNext()
    disabledPrev()
}

SLIDER.addEventListener('animationend', animate=>{
    if(animate.animationName == "remove-animate"){
        createPaginationPetTemplate(pageList[p], array)
        NEXT_BTN.addEventListener('click', goNext)
        PREV_BTN.addEventListener('click', goPrev)
        LAST_BTN.addEventListener('click', goLast)
        FIRST_BTN.addEventListener('click', goFirst)
        SLIDER.classList.remove('remove__animate')
        SLIDER.classList.add('add__animate')
    }
})

NEXT_BTN.addEventListener('click', goNext)
LAST_BTN.addEventListener('click', goLast)
PREV_BTN.addEventListener('click', goPrev)
FIRST_BTN.addEventListener('click', goFirst)


