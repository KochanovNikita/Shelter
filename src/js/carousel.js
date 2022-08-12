const CAROUSEL = document.querySelector('.carousel')
const BTN_LEFT = document.querySelectorAll('.button__arrow')[0]
const BTN_RIGHT = document.querySelectorAll('.button__arrow')[1]
let carousel_items = document.querySelectorAll('.carousel__item')

let firstArr = []
let secondArr = []
let thirdArr = []

function checkPet(arr, prevarr, elem){
    if((arr.includes(elem) == true) || (prevarr.includes(elem) == true)){
        elem = Math.floor(Math.random()*8)
        return checkPet(arr,prevarr, elem)
    }
    return elem
}

const createPetTemplate = (div,sa) =>{
    
    for(let i =0; i<sa; i++){
        let currentPet = Math.floor(Math.random()*8)
   
        if(div.id == 0){
            currentPet = checkPet(firstArr, secondArr, currentPet)
            firstArr.push(currentPet)
        }
        if(div.id == 1){
            currentPet = checkPet(secondArr, firstArr, currentPet)
            secondArr.push(currentPet)
        }
        if(div.id == 2){
            currentPet = checkPet(thirdArr, secondArr, currentPet)
            thirdArr.push(currentPet)
        }

        div.innerHTML += `
            <div class="carousel__card pet-modal" data-name="${array[currentPet].name}">
                <div class="carousel__card_img" >
                    <img class="pet-modal" data-name="${array[currentPet].name}" src="src/images/pets/${array[currentPet].img}" alt="${array[currentPet].type}">
                </div>
                <div class="carousel__card_name pet-modal" data-name="${array[currentPet].name}">
                ${array[currentPet].name}
                </div>
                <button class="button button__white pet-modal" data-name="${array[currentPet].name}">
                    Learn more
                </button>
            </div>
        `

    }
}

window.addEventListener('load', ()=>{
    if(window.innerWidth>=1280){
        size = 3
    }
    if(window.innerWidth<1280 && window.innerWidth>767){
        size = 2
    }
    if(window.innerWidth<=767){
        size = 1
    }
    carousel_items.forEach(item=>{
        createPetTemplate(item, size)
    })
})


const moveLeft = () =>{
    CAROUSEL.classList.add('transition-left')
    BTN_LEFT.removeEventListener('click',moveLeft)
    BTN_RIGHT.removeEventListener('click', moveRight)
}
BTN_LEFT.addEventListener('click', moveLeft)

const moveRight = ()=>{
    CAROUSEL.classList.add('transition-right')
    BTN_RIGHT.removeEventListener('click', moveRight)
    BTN_LEFT.removeEventListener('click',moveLeft)
}
BTN_RIGHT.addEventListener('click', moveRight)

CAROUSEL.addEventListener("animationend", (animationEvent)=>{

    console.log(animationEvent.animationName);
    if(animationEvent.animationName == "move-left"){
        CAROUSEL.classList.remove("transition-left")
        thirdArr = secondArr
        secondArr = firstArr
        firstArr = []
        carousel_items[2].innerHTML = carousel_items[1].innerHTML
        carousel_items[1].innerHTML = carousel_items[0].innerHTML
        carousel_items[0].innerHTML=''
        thirdArr = []
        createPetTemplate(carousel_items[0],size)
    }else{
        CAROUSEL.classList.remove("transition-right")
        firstArr = secondArr
        secondArr = thirdArr
        thirdArr = []
        carousel_items[0].innerHTML = carousel_items[1].innerHTML
        carousel_items[1].innerHTML = carousel_items[2].innerHTML
        carousel_items[2].innerHTML = ''
        thirdArr = []
        createPetTemplate(carousel_items[2],size)
    }
    BTN_LEFT.addEventListener('click', moveLeft)
    BTN_RIGHT.addEventListener('click', moveRight)
})