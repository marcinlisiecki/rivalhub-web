import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AddStationService} from "../../../core/services/add-station/add-station.service";
import {Station} from "../../../core/interfaces/Station";
import {stationType} from "../../../core/utils/stationType";

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss']
})

export class AddStationComponent {
  constructor(
    private router: Router,
    private addStationService: AddStationService,
  ) {}

  addStationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    type: new FormControl('', [Validators.required]
    )
  })

  public stationType: string[] = Object.values(stationType)
  selectedOption: string = stationType.PING_PONG

  get name() {
    return this.addStationForm.get('name')
  }

  get type() {
    return this.addStationForm.get('type')
  }

  onSubmit() {
    if (!this.addStationForm.valid) {
      this.addStationForm.markAllAsTouched();
      return;
    }

    // send data to backend
    if (this.name?.value == null) {
      return;
    }

    const station: Station = {
      name: this.name?.value,
      type: this.selectedOption
    }
    this.addStationService.addStation(this.router.url, station)

  }

}
