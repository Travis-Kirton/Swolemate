import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html'
})
export class TimerPage implements OnInit {

  sets: number = 0;

  current:number;
  max:number;

  subscription: any;
  tick: number;
  remainingSeconds: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
  timeInSeconds: number;

  constructor(public alertCtrl: AlertController) {


  }

  ngOnInit() {
    this.subscription = Observable.interval(1000).subscribe(x => {
      this.tick++;
    });

    this.timeInSeconds = 60;
    this.max = 60;
    this.initTimer();
  }

  onTimerEvent(data) {
    console.log(data);
  }


  pickTime() {
    let alert = this.alertCtrl.create({
      title: 'Time',
      subTitle: 'Choose time (seconds)',
      inputs: [{ 
        name: 'time',
        placeholder: '60',
        type:'number'
      }],
      buttons: [{
        text: 'Ok',
        handler: data => {
          if(data.time){
            this.timeInSeconds = data.time;
            this.max = this.timeInSeconds;
            this.current = this.timeInSeconds;
            this.initTimer();
          }
        }
      }]
    });
    alert.present();
  }

  startTimer() {
    this.runTimer = true;
    this.hasStarted = true; 
    this.timerTick();
  }

  pauseTimer() {
    this.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {
      if (!this.runTimer) { return; }
      this.remainingSeconds--;
      this.current = this.remainingSeconds;
      console.log(this.max + ', ' + this.current);
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingSeconds);
      if (this.remainingSeconds > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
        this.sets++;
        this.initTimer();
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var minutesString = '';
    var secondsString = '';
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return minutesString + ':' + secondsString;
  }

  initTimer() {
    if (!this.timeInSeconds) { this.timeInSeconds = 0; }
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingSeconds = this.timeInSeconds;
    this.current = this.remainingSeconds;
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingSeconds);
  }

  resetSets() {
    this.sets = 0;
  }


}
