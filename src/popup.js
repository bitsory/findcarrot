'use strict';

export default class PopUp {
   
    constructor() {
        
        this.pop_up = document.querySelector('.pop_up');
        this.pop_up_refresh = document.querySelector('.pop_up_refresh');
        this.pop_up_message = document.querySelector('.pop_up_message');

        this.pop_up_refresh.addEventListener('click', ()=> {
            this.popUpOnClick && this.popUpOnClick();
            this.pop_up.style.visibility = 'hidden';
        });
    }

    setClickListener(onClick) {
        this.popUpOnClick = onClick;
        console.log('popup - setclicklistener');
    }

    show(text) {
        this.pop_up.style.visibility = 'visible';
        //pop_up.setAttribute('class', 'pop_up');
        this.pop_up_message.innerHTML = `${text}`;
    }


}