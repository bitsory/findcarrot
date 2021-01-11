'use strict';

export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.game_field = document.querySelector('.game_field');
        this.onClick = this.onClick.bind(this);
        this.game_field.addEventListener('click', this.onClick);

    }

    startGame() {
        this._addItem('carrot', this.carrotCount, '/carrot/images/carrot.png');
        this._addItem('bug', this.bugCount, '/carrot/images/bug.png');
    }

    resetGame() {
        this.game_field.innerHTML ='';
    }    

    test() {
        console.log('onclick test');
    }

    
    setClickListener(onClick) {
        console.log('field - setclicklistener - onclickitem');
        this.onClickItem = onClick;
    }

    onClick = function(event){
        const target = event.target;
        console.log(target);
       
        if (target.matches('.carrot')) {
            target.remove();
            console.log('field - onClick - carrot');
            this.onClickItem && this.onClickItem('carrot');
        } else if (target.matches('.bug')) {
            console.log('field - onClick - bug');
            this.onClickItem && this.onClickItem('bug');
        }
    }


    
    _addItem(itemName, count,  path) { 
        
        let x2 = this.game_field.clientWidth-80;
        let y2 = this.game_field.clientHeight-80;

        for (let i = 0 ; i < count ; i ++) {
            let x = getRandom(0, x2);
            let y = getRandom(0, y2);

            const item = document.createElement('img');
            item.setAttribute('class', itemName);
            item.setAttribute('src', path);
            item.style.position = 'absolute';
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.game_field.appendChild(item);
                
        }
           
        
    }

}

function getRandom(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}