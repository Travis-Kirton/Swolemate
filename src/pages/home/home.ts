import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddRoutinePage } from '../add-routine/add-routine';
import { Routine } from '../../models/routine';
import { RoutineService } from '../../services/routine';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  addRoutinePage = AddRoutinePage;
  constructor(public navCtrl: NavController,
              public routineService: RoutineService) {

  }

  ionViewDidLoad() {
    this.routineService.loadRoutines();
  }

  ngOnInit() {
    this.routineService.fetchRoutines();
  }



  onShowRoutine(routine: Routine, index: number) {
    this.navCtrl.push(AddRoutinePage, {routine: routine, isSet: true, index: index});
  }

  reorderItems(data) {
    this.routineService.reorderRoutines(data);
  }

}
