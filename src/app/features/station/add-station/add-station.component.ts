import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddStationService } from '@app/core/services/add-station/add-station.service';
import { EventType } from '@interfaces/event/event-type';
import {
  categoryTypeToLabel,
  labelToCategoryType,
} from '@app/core/utils/event';
import { NewStation } from '@interfaces/station/new-station';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss'],
})
export class AddStationComponent {
  constructor(
    private route: ActivatedRoute,
    private addStationService: AddStationService,
    private router: Router,
  ) {}

  public stationType = Object.keys(EventType);
  selectedOption = this.stationType[0];

  addStationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    type: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    if (id == '') {
      return;
    }

    if (this.stationType == null) {
      return;
    }

    if (!this.addStationForm.valid) {
      this.addStationForm.markAllAsTouched();
      return;
    }

    if (this.name?.value == null) {
      return;
    }

    if (this.type?.value == null) {
      return;
    }

    const station: NewStation = {
      name: this.name.value,
      type: labelToCategoryType(this.type.value),
    };

    this.addStationService.saveStation(id, station).subscribe(
      (savedStation) => {
        this.router.navigateByUrl(`/organizations/${id}/stations`).then();
      },
      (error) => {
        console.log('Error has ocurred.');
      },
    );
  }

  get name() {
    return this.addStationForm.get('name');
  }

  get type() {
    return this.addStationForm.get('type');
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
