import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss']
})
export class AddStationComponent {

  addStationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    type: new FormControl('', [Validators.required]
    )
  })

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
  }

}
