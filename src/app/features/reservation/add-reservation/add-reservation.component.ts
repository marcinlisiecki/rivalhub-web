import { Component } from '@angular/core';
import {Organization} from "../../../core/interfaces/Organization";
import {Station} from "../../../core/interfaces/Station";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent {
  stations: Station[] = [
    {
      id: 1,
      name: 'Stół nr 1',
      type: 'PING-PONG',
    },
    {
      id: 2,
      name: 'Stół nr 2',
      type: 'PING-PONG',
    },
    {
      id: 3,
      name: 'Stół nr 1',
      type: 'BILLIARDS',
    },
  ];

  types = new Set(this.stations.map((station) => station.type));
  checkboxs:Map<Station,Boolean> = new Map();
  date: any;
  startTime: any;
  finishTime: any;
  checkoutForm: any;
  invalidDate: boolean = false;
  readyDateAndValid: boolean = false;
  emptyData: boolean = false;
  today: Date = new Date();
  constructor() {
    this.stations.forEach((station)=>this.checkboxs.set(station,false));
  }

  checkValue(inputId: Station) {
    this.checkboxs.set(inputId,!<Boolean>this.checkboxs.get(inputId))
  }

  onSubmit() {
    if(this.startTime == null || this.finishTime == null || this.date == null){
      this.emptyData = true;
      return;
    }
    this.emptyData = false;
    if (this.startTime>=this.finishTime) {
      this.invalidDate = true;
      this.readyDateAndValid = false;
    } else {
      this.invalidDate = false;
      this.readyDateAndValid = true;
    }
    return;
  }

}
