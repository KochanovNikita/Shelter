const burger = document.querySelector('.burger')
const nav = document.querySelector('.burger__nav') 
const sticks = document.querySelectorAll('.burger__element')
const burgerLinks = document.querySelectorAll('.burger__links_link')
const body = document.querySelector('body')
const shadow = document.querySelector('.shadow')
let flag = false

function noScroll(flag){
    if(flag==false)
    {
        body.style.overflow = 'hidden'
        flag=!flag
    }else{
        body.style.overflow = 'visible'
        flag=!flag
    }
    return flag
}

burger.addEventListener('click', ()=>{
    nav.classList.toggle("burger__active")
    burger.classList.toggle("burger__rotate")
    shadow.classList.toggle('block')
    sticks.forEach(stick=>{
        stick.classList.toggle("burger__element_black")
        stick.classList.toggle("burger__element_light")
    })
   flag=noScroll(flag)
})

burgerLinks.forEach(link=>{
    link.addEventListener('click',()=>{
        nav.classList.toggle("burger__active")
        burger.classList.toggle("burger__rotate")
        shadow.classList.toggle('block')
        flag=noScroll(flag)
    })

})

window.addEventListener('click', (e)=>{
    if(e.target.classList.contains('block')&&e.target.classList.contains('shadow')){
        nav.classList.toggle("burger__active")
        burger.classList.toggle("burger__rotate")
        shadow.classList.toggle('block')
        flag=noScroll(flag)
    }
})