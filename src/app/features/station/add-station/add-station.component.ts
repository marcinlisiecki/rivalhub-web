import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddStationService } from '@app/core/services/add-station/add-station.service';
import { EventType } from '@interfaces/event/event-type';
import {
  categoryTypeToLabel,
  labelToCategoryType,
} from '@app/core/utils/event';
import { NewStation } from '@interfaces/station/new-station';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss'],
})
export class AddStationComponent implements OnInit {

  public organizationId!: number
  public stationType = Object.keys(EventType);
  public selectedType: string
  public errorResponse!: string

  addStationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    type: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private addStationService: AddStationService,
    private router: Router,
  ) {
    this.selectedType = categoryTypeToLabel(this.stationType[0])
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.organizationId = params['id']
    })
  }

  onSubmit() {
    const stationName = this.addStationForm.get('name')?.value
    if (stationName == null || this.selectedType == null) {
      return
    }

    const newStation: NewStation = {
      name : stationName,
      type : labelToCategoryType(this.selectedType)
    }

    this.addStationService.saveStation(this.organizationId, newStation).subscribe({
      next: (newStation: NewStation) => {
        this.router.navigateByUrl('/organizations').then()
      },
      error: (error: HttpErrorResponse) => {
        this.errorResponse = "Coś poszło nie tak"
      }
    })
  }

  onSelected(value: string) {
    this.selectedType = value
  }

  get name() {
    return this.addStationForm.get('name');
  }

  get type() {
    return this.addStationForm.get('type');
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
