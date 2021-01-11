'use strict';
import Field from './field.js';


export default class GameBuilder {
    setDuration(duration) {
        this.duration = duration;
        
        return this;
    }

    setCarrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    setBugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        //console.log(`${this.setDuration}, ${this.setCarrotCount}, ${this.setBugCount}`);
        return new Game(
             this.duration,
             this.carrotCount,
             this.bugCount
        );
    }
}

/*
export default class GameBuilder {
    gameDuration(duration) {
      this.gameDuration = duration;
      return this;
    }
  
    carrotCount(num) {
      this.carrotCount = num;
      return this;
    }
  
    bugCount(num) {
      this.bugCount = num;
      return this;
    }
  
    build() {
      return new Game(
        this.gameDuration, //
        this.carrotCount,
        this.bugCount
      );
    }
  }
*/

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.timer = undefined;
        this.remainingTimeSecForResume;
        this.score = 0;

        this.started = false;
        this.pause = false;
        this.ended = true;

        this.play = document.querySelector('.play');
        this.game_timer = document.querySelector('.timer');
        this.game_score = document.querySelector('.score');

        // this.gameBanner = new PopUp();
        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(item => this.clickItem(item));

        this.play.addEventListener('click', () => {
            //this.newGame();
            this.playOnClick && this.playOnClick(); 
        });

    }

    

    clickItem(item) {
    console.log(`clickitem : ${item}`);
    if (item === 'carrot'){
        console.log('hit carrot');
        console.log(`${this.carrotCount} == ${this.score}`);

        if (this.carrotCount == this.score + 1) {
            
            this.score++;
            this.game_score.innerHTML = this.carrotCount - this.score;
            this.endOFGame('win');
            clearInterval(this.timer);
            return;
        } else {
        
        this.score++;
        this.game_score.innerHTML = this.carrotCount - this.score;
        }
    }

    else if (item === 'bug') {
        console.log('bug');
        this.endOFGame('lose');
        clearInterval(this.timer);
        
    }
}

    setClickListener(onClick) {
        this.playOnClick = onClick;
    }

    newGame() {
        this.started = true;
        this.pause = false;
        this.ended = false;
        this.startGameTimer(this.gameDuration);
        this.gameField.startGame();
        this.game_timer.style.visibility = 'visible';
        this.game_score.style.visibility = 'visible';
        this.play.innerHTML = 'X';
        this.game_score.innerHTML = this.carrotCount;
        
    }

    stopGame() {
        clearInterval(this.timer);
        console.log(`stop game : ${this.remainingTimeSecForResume}`);
        this.play.style.visibility = 'hidden';
        this.started = true;
        this.pause = true;
        this.ended = false;
    }

    resumePlay() {
        console.log('resume play');
        this.startGameTimer(this.remainingTimeSecForResume);
        this.play.style.visibility = 'visible';
       
        this.started = true;
        this.pause = false;
    }

    restartPlay() {
        console.log('restart play');
        
        this.play.style.visibility = 'visible';
        this.play.innerHTML = '>';
        // pop_up.style.visibility = 'hidden';
        //pop_up.setAttribute('class', 'pop_up pop_up_hide');
        
        this.game_timer.style.visibility = 'hidden';
        this.game_score.style.visibility = 'hidden';

        this.gameField.resetGame();
        this.started = false;
        this.pause = false;
        this.ended = false;

        this.score = 0;

    }



    startGameTimer(time) {
        console.log(`game timer : ${time}`);

        if (this.started == true && this.pause == false) {
            console.log(`game timer : ${time}`);
            let remainingTimeSec = time;
            this._updateTimeText(remainingTimeSec);
            this.timer = setInterval(()=>{
                console.log(`game timer : ${this.timer}`);
                if(remainingTimeSec <= 0) {
                    clearInterval(this.timer);
                    console.log('game timer finish...');
                    this.endOFGame('lose');

                    return; 
                }
                remainingTimeSec--;
                this._updateTimeText(remainingTimeSec);
                this.remainingTimeSecForResume = remainingTimeSec;
            }, 1000);

        } else if (this.started === true && this.pause === true){
            console.log('game timer resumed...');
            let remainingTimeSec = time;
            this._updateTimeText(remainingTimeSec);
            this.timer = setInterval(()=>{
                if(remainingTimeSec <= 0) {
                    clearInterval(this.timer);
                    console.log('game timer finish...');
                    this.endOFGame('lose');

                    return; 
                }
                remainingTimeSec--;
                this._updateTimeText(remainingTimeSec);
                this.remainingTimeSecForResume = remainingTimeSec;
            }, 1000);
        }
    }

    _updateTimeText(time) {
        this.game_timer.innerHTML=`0:${time}`;
    
    }

    endOFGame(result) {
        this.play.style.visibility = 'hidden';
        this.ended = true;
        //this.gameBanner.show(text);
        this.onGameResult && this.onGameResult(result);

    }

    onGameResultListener(onGameResult) {
        this.onGameResult = onGameResult;
    }
}