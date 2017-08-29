import { Component } from '@angular/core';
import { ModalController, NavController, ToastController, NavParams } from 'ionic-angular';

import { Exercise } from '../../models/exercise';
import { Routine } from '../../models/routine';

import { AddExercisePage } from '../add-exercise/add-exercise';
import { RoutineService } from '../../services/routine';


@Component({
  selector: 'page-add-routine',
  templateUrl: 'add-routine.html',
})
export class AddRoutinePage {
  exercises: Exercise[] = [];
  title: string = "";
  routine: Routine;
  exerciseisSet: boolean = false;
  routineIndex : number;

  constructor(private modalCtrl: ModalController,
    private routineService: RoutineService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private navParams: NavParams) {

    if (this.navParams.get('isSet')) {
      this.routine = navParams.get('routine');
      this.routineIndex = navParams.get('index');
      this.exercises = this.routine.exercise;
      this.title = this.routine.name;
    }

  }

  onOpenExercise(index: number) {
    const modal = this.modalCtrl.create(AddExercisePage, {
      exercise: this.exercises[index]
    });
    modal.present();

    modal.onDidDismiss(
      data => {
        if (data) {
          const exercise = new Exercise(data.name,
            data.sets,
            data.reps,
            data.weight);
          if (data.name) {
            if (index < this.exercises.length) {
              this.exercises[index] = exercise;
            } else {
              this.exercises.push(exercise);
            }
          }
        }
      }
    );
  }

  onAddRoutine() {
    if (this.title != "" && this.exercises.length > 0) {
      if (this.routineIndex <= (this.routineService.loadRoutines.length+1)) {
        console.log(this.title);
        this.routineService.replaceRoutine(this.routine, this.routineIndex);
      }else{
        this.routineService.addRoutine(this.title, this.exercises);
      }
      this.navCtrl.popToRoot();
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please add a title and exercises',
        duration: 2000
      });
      toast.present();

    }
  }

  onDeleteExercise(index: number) {
    this.exercises.splice(index);
  }



}
