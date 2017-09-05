import { Routine } from '../models/routine';
import { Exercise } from '../models/exercise';
import { reorderArray } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class RoutineService {

  constructor(private storage: Storage) {}

  routines: Routine[] = [];

  addRoutine(name: string,
           exercises: Exercise[]) {

    const routine = new Routine(name, exercises);

    this.routines.push(routine);
    this.storage.set('routines', this.routines)
    .then()
    .catch(
      err => {
        this.routines.splice(this.routines.indexOf(routine), 1);
      }
    );
  }

  deleteRoutine(routine: Routine) {
    this.routines.splice(this.routines.indexOf(routine),1);
    this.storage.set('routines', this.routines)
    .then()
    .catch(
      err => {
        console.log(err)
      }
    );
  }

  replaceRoutine(routine: Routine, index: number, title: string) {
    this.routines[index] = routine;
    this.routines[index].name = title;
  }

  reorderRoutines(data){
    this.routines = reorderArray(this.routines, data);
  }

  loadRoutines() {
    return this.routines.slice();
  }

  fetchRoutines(){
    this.storage.get('routines')
      .then(
        (routines: Routine[]) => {
          this.routines = routines != null ? routines : [];
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      )
  }
  
}
