'use strict';
import Field from './field.js';
import PopUp from './popup.js';
import Game from './game.js';
import GameBuilder from './game.js';


// const play = document.querySelector('.play');
// const game_timer = document.querySelector('.timer');
// const game_score = document.querySelector('.score');
//const game_field = document.querySelector('.game_field');

// const pop_up = document.querySelector('.pop_up');
// const pop_up_refresh = document.querySelector('.pop_up_refresh');
// const pop_up_message = document.querySelector('.pop_up_message');

const GAME_DURATION = 10;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const CARROT_SIZE = 80;

//let score = 0;
//let remainingTimeSecForResume;
//let timer = undefined;

// let started = false;
// let pause = false;
// let ended = true;

const game = new GameBuilder()    
.setDuration(10)
.setCarrotCount(5)    
.setBugCount(5)    
.build();



//const game = new Game(10, CARROT_COUNT, BUG_COUNT);
//const gameField = new Field();
const gameFinishBanner = new PopUp();

console.log(game);

game.setClickListener(() => {
    if (game.started == false && game.pause == false) { // new game start
        // started = true;
        // pause = false;
        // ended = false;
        //gameField.startGame();
        game.newGame();
        //game.startGameTimer(GAME_DURATION);

    } else {  // game pause
        game.stopGame();
        gameFinishBanner.show('Resume Play?');
        
        // started = true;
        // pause = true;
        // ended = false;

   }

});

game.onGameResultListener(result => {
    let message;
    switch (result) {
        case 'win':
            message = 'You Win!!';
            break;
        case 'lose':
            message = 'You Lost!!';
            break;
        default:
            throw new Error('not valid result');
    }
    gameFinishBanner.show(message);

});
/*

function addItem() {
   
    if (!game_field.hasChildNodes()) {
        let x2 = game_field.clientWidth-CARROT_SIZE;
        let y2 = game_field.clientHeight-CARROT_SIZE;

        // const item_bug = document.createElement('img');
        // item_bug.setAttribute('class', 'bug');
        // item_bug.setAttribute('src', '/images/bug.png');
        // item_bug.style.position = 'absolute';
        // item_bug.style.left = `${x}px`;
        // item_bug.style.top = `${y}px`;
        // game_field.appendChild(item_bug);

        // const item_carrot = document.createElement('img');
        // item_carrot.setAttribute('class','carrot');
        // item_carrot.setAttribute('src','/images/carrot.png');
        // item_carrot.style.position = 'absolute';
        // item_carrot.style.left = '150px';
        // item_carrot.style.top = '340px';

        // const item_bug2 = document.createElement('img');
        // item_bug2.setAttribute('class', 'bug');
        // item_bug2.setAttribute('src', '/images/bug.png');
        // item_bug2.style.position = 'absolute';
        // item_bug2.style.left = '160px';
        // item_bug2.style.top = '350px';
        
        
        // game_field.appendChild(item_carrot);
        // game_field.appendChild(item_bug2);

        for (let i = 0 ; i < 9 ; i++) {
            let x = getRandom(0, x2);
            let y = getRandom(0, y2);
            
            const item_carrot = document.createElement('img');
            item_carrot.setAttribute('class', 'carrot');
            item_carrot.setAttribute('src', '/images/carrot.png');
            item_carrot.style.position = 'absolute';
            item_carrot.style.left = `${x}px`;
            item_carrot.style.top = `${y}px`;

            game_field.appendChild(item_carrot);
            
        }

        for (let i = 0 ; i < 9 ; i++) {
            let x = getRandom(0, x2);
            let y = getRandom(0, y2);
            
            const item_bug = document.createElement('img');
            item_bug.setAttribute('class', 'bug');
            item_bug.setAttribute('src', '/images/bug.png');
            item_bug.style.position = 'absolute';
            item_bug.style.left = `${x}px`;
            item_bug.style.top = `${y}px`;

            game_field.appendChild(item_bug);
            
        }

        // const $item = document.querySelector('.bug');
        // const item_rect = $item.getClientRects();
        // const item_bound = $item.getBoundingClientRect();
        // console.log(item_rect);
        // console.log(item_bound);

        // const game_field_rect = game_field.getBoundingClientRect();
        // console.log(game_field_rect);
        // console.log(game_field.hasChildNodes());
        // console.log(x2, y2);
    }


}

*/



/*
play.addEventListener('click', (event)=> {
   if (started == false && pause == false) { // new game start
        started = true;
        pause = false;
        ended = false;

        gameField.startGame();
        game_timer.style.visibility = 'visible';
        game_score.style.visibility = 'visible';
        play.innerHTML = 'X';
        game_score.innerHTML = CARROT_COUNT;
        startGameTimer(GAME_DURATION);
        //startGame();
        
        // play.innerHTML = '>';
        
   } else {  // game pause
        stopGame();
        
        started = true;
        pause = true;
        ended = false;
   }
    
    //setInterval(timer,1000);
    // const $carrot = document.querySelector('.carrot');
});
*/

function test() {
    console.log('----------test--------');
}



gameFinishBanner.setClickListener(()=> {
    test();
    
    if (game.started == true && game.pause == true) { // resume play
        game.resumePlay();
        /*
        console.log('resume play');
        startGameTimer(remainingTimeSecForResume);
        play.style.visibility = 'visible';
        // pop_up.style.visibility = 'hidden';
        //pop_up.setAttribute('class', 'pop_up pop_up_hide');
        started = true;
        pause = false;
        */

    } else if (game.started == true && game.pause == false && game.ended == true){ // restart play
        game.restartPlay();
        //gameField.resetGame();

        // console.log('restart play');
        // game_field.innerHTML = '';
        // play.style.visibility = 'visible';
        // play.innerHTML = '>';
        // // pop_up.style.visibility = 'hidden';
        // //pop_up.setAttribute('class', 'pop_up pop_up_hide');
        
        // game_timer.style.visibility = 'hidden';
        // game_score.style.visibility = 'hidden';

        // started = false;
        // pause = false;
        // score = 0;
    }


});





function restartPlay() {
    console.log('restart play');
    gameField.resetGame();
    play.style.visibility = 'visible';
    play.innerHTML = '>';
    // pop_up.style.visibility = 'hidden';
    //pop_up.setAttribute('class', 'pop_up pop_up_hide');
    
    game_timer.style.visibility = 'hidden';
    game_score.style.visibility = 'hidden';

    started = false;
    pause = false;

    score = 0;

}

/*
pop_up_refresh.addEventListener('click', (event)=> {
    // if (remainingTimeSec === 0 ) { // new game 
    //     startGame();
    // } else { // resume game
    //     startGameTimer();
    //     play.style.visibility = 'visible';
    // }
    if (started == true && pause == true) { // resume play
        console.log('resume play');
        startGameTimer();
        play.style.visibility = 'visible';
        // pop_up.style.visibility = 'hidden';
        //pop_up.setAttribute('class', 'pop_up pop_up_hide');
        started = true;
        pause = false;

    } else { // restart play
        console.log('restart play');
        game_field.innerHTML = '';
        play.style.visibility = 'visible';
        play.innerHTML = '>';
        // pop_up.style.visibility = 'hidden';
        //pop_up.setAttribute('class', 'pop_up pop_up_hide');
        
        game_timer.style.visibility = 'hidden';
        game_score.style.visibility = 'hidden';

        started = false;
        pause = false;
        score = 0;


    }


});
*/

// function hit_carrot() {
//     const carrot = document.querySelector('.carrot');
//     carrot.remove();
// }


function getRandom(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function startGame() {
    game_timer.style.visibility = 'visible';
    game_score.style.visibility = 'visible';
    game_score.innerHTML = CARROT_COUNT;
    //addItem();
    startGameTimer(GAME_DURATION);
}

function stopGame() {
    console.log(timer);
    clearInterval(timer);
    console.log(`stop game : ${remainingTimeSecForResume}`);
    play.style.visibility = 'hidden';
    gameFinishBanner.show('Resume Play?');
    //showPopUp('Resume Play?');
    

}

// function showPopUp(text) {
//     pop_up.style.visibility = 'visible';
//     //pop_up.setAttribute('class', 'pop_up');
//     pop_up_message.innerHTML = `${text}`;
// }


function startGameTimer(time) {
    // const timer = document.querySelector('.timer');

    // if (time_remain >= 0) {
    //     timer.innerHTML = `0:${time_remain}`;               
    //     time_remain--;
    // } else {
    //     pop_up.setAttribute('class', 'pop_up');
    // }       
    if (started == true && pause == false) {
        console.log('game timer initalized...');

        let remainingTimeSec = time;
        updateTimeText(remainingTimeSec);
        timer = setInterval(()=>{
            console.log(`game timer : ${timer}`);
            if(remainingTimeSec <= 0) {
                clearInterval(timer);
                console.log('game timer finish...');

                return endOFGame('You lose!');
            }
            remainingTimeSec--;
            updateTimeText(remainingTimeSec);
            remainingTimeSecForResume = remainingTimeSec;
        }, 1000);

    } else if (started === true && pause === true){
        console.log('game timer resumed...');
        let remainingTimeSec = time;
        updateTimeText(remainingTimeSec);
        timer = setInterval(()=>{
            if(remainingTimeSec <= 0) {
                clearInterval(timer);
                console.log('game timer finish...');

                return endOFGame('You lose!');
            }
            remainingTimeSec--;
            updateTimeText(remainingTimeSec);
            remainingTimeSecForResume = remainingTimeSec;
        }, 1000);
    }

}



function updateTimeText(time) {
    game_timer.innerHTML=`0:${time}`;

}

function endOFGame(text) {
    play.style.visibility = 'hidden';
    gameFinishBanner.show(text);

    ended = true;
    console.log(`start : ${started}, pause : ${pause}, end : ${ended}`);
    //pop_up.style.visibility = 'visible';
    // pop_up.setAttribute('class', 'pop_up');
    //pop_up_message.innerHTML = `${text}`;
}


//gameField.setClickListener(clickItem);

function clickItem(item) {
    console.log(`clickitem : ${item}`);
    if (item === 'carrot'){
        console.log('hit carrot');
        console.log(`${CARROT_COUNT} == ${score}`);

        if (CARROT_COUNT == score + 1) {
            
            score++;
            game_score.innerHTML = CARROT_COUNT - score;
            endOFGame('You Win!!');
            clearInterval(timer);
            return;
        } else {
        
        score++;
        game_score.innerHTML = CARROT_COUNT - score;
        }
    }

    else if (item === 'bug') {
        console.log('bug');
        endOFGame('You lose!!');
        clearInterval(timer);
        
    }
}

/*
game_field.addEventListener('click', (event)=> {
    const target = event.target;

    
    
    if (target.matches('.carrot')){
        console.log('hit');
        console.log(`${CARROT_COUNT} == ${score}`);

        if (CARROT_COUNT == score + 1) {
            target.remove();
            score++;
            game_score.innerHTML = CARROT_COUNT - score;
            endOFGame('You Win!!');
            clearInterval(timer);
            return;
        } else {
        target.remove();
        score++;
        game_score.innerHTML = CARROT_COUNT - score;
        }
    }

    else if (target.matches('.bug')) {
        console.log('bug');
        endOFGame('You lose!!');
        clearInterval(timer);
        
    }

});
*/




// function hitCarrot() {
//     const item_carrot = document.querySelector('.carrot');
//     item_carrot.remove();
// }

// $carrot.addEventListener('click', (event)=> {
//     hitCarrot();
// });