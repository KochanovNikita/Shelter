const popupModal = document.querySelector('.popup')

window.addEventListener('click',(e)=>{
    if(e.target.classList.contains('popup')){
        popupModal.classList.toggle('block')
        flag=noScroll(flag)
    }
    else if(e.target.classList.contains('popup__close')){
        popupModal.classList.toggle('block')
        flag=noScroll(flag)
    }

    else if(e.target.classList.contains('pet-modal')){
        let popup = array.find(p=>p.name == e.target.dataset.name)
        popupModal.classList.toggle('block')
        flag=noScroll(flag)
        popupModal.innerHTML = `
            <div class="popup__wrapper">
                <div class="popup__img">
                    <img src="src/images/pets/${popup.img}"/>
                </div>
                <div class="popup__info">
                    <div class="popup__close">
                        &#10006;
                    </div>
                    <h3 class="popup__title">${popup.name}</h3>
                    <h4 class="popup__subtitle">${popup.type} - ${popup.breed}</h4>
                    <p class="popup__descr">${popup.description}</p>
                    <ul class="popup__list">
                        <li class="popup__li">
                        <strong>Age: </strong>
                        <span>${popup.age}</span>
                        </li>
                        <li class="popup__li">
                        <strong>Inoculations: </strong>
                            <span>${popup.inoculations.join(' ')}</span>
                        </li>
                        <li class="popup__li"><strong>Diseases:</strong>
                            <span> ${popup.diseases.join(' ')}</span>
                        </li>
                        <li class="popup__li"><strong>Parasites: </strong>
                            <span>${popup.parasites.join(' ')}</span>
                        </li>
                    </ul>
                </div>
            </div>
        `
    }
})
window.addEventListener('mouseover', (e)=>{
    if(e.target.classList.contains('popup')){
        document.querySelector('.popup__close').classList.add('popup__close_active')
    }
})
window.addEventListener('mouseout', (e)=>{
    if(e.target.classList.contains('popup')){
        document.querySelector('.popup__close').classList.remove('popup__close_active')
    }
})
