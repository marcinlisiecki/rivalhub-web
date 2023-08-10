import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventType } from '@interfaces/event/event-type';
import {
  categoryTypeToLabel,
  labelToCategoryType,
} from '@app/core/utils/event';
import { NewStation } from '@interfaces/station/new-station';
import { StationsService } from '@app/core/services/stations/stations.service';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss'],
})
export class AddStationComponent {
  constructor(
    private route: ActivatedRoute,
    private stationsService: StationsService,
    private router: Router,
  ) {}

  public stationType = Object.keys(EventType);
  selectedOption = this.stationType[0];

  addStationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    type: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const idString = this.route.snapshot.paramMap.get('String') ?? '';
    if (idString == '') {
      return;
    }
    const id = Number(idString);

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
      active: true,
    };

    this.stationsService.saveStation(id, station).subscribe(
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
