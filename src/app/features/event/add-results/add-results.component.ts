import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventType } from '@interfaces/event/event-type';

@Component({
  selector: 'app-add-results',
  templateUrl: './add-results.component.html',
  styleUrls: ['./add-results.component.scss'],
})
export class AddResultsComponent implements OnInit {
  eventType!: EventType;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventType = this.route.snapshot.params['type'];
  }

  protected readonly EventType = EventType;
}
