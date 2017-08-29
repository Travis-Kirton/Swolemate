import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { Exercise } from '../../models/exercise';


@Component({
  selector: 'page-add-exercise',
  templateUrl: 'add-exercise.html',
})
export class AddExercisePage {
  exercise: Exercise;
  name: string;
  sets: number;
  reps: number;
  weight: number

  constructor(private viewCtrl: ViewController,
    private navParams: NavParams) {

    if (this.navParams.get('exercise')) {
      this.exercise = this.navParams.get('exercise');
      this.name = this.exercise.name;
      this.sets = this.exercise.sets;
      this.reps = this.exercise.reps;
      this.weight = this.exercise.weight;
    }

  }



  onSubmit(form: NgForm) {

    this.viewCtrl.dismiss({
      name: form.value.name,
      sets: form.value.sets,
      reps: form.value.reps,
      weight: form.value.weight
    });
  }

  onDismiss() {
    this.name = null;
    this.sets = null;
    this.reps = null;
    this.weight = null;
    this.viewCtrl.dismiss;
  }
}
