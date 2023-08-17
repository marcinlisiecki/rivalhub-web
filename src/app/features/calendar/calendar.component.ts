import {AfterViewInit, Component, OnInit, signal} from '@angular/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import {OrganizationsService} from "@app/core/services/organizations/organizations.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {Reservation} from "@interfaces/reservation/reservation";
import {EventDto} from "@interfaces/event/event-dto";
import {OrganizationSettings} from "@interfaces/organization/organization-settings";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Organization} from "@interfaces/organization/organization";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit,AfterViewInit {
  sidebarHeader = this.serv.currentDate;
  sidebarVisible: boolean = false;
  sidebarMargin = "0";
  sidebarWidth = '0';
  sidebarIcon? = 'pi pi-arrow-right';
  calendarMargin = '0';
  reservations: Reservation[] = [];
  events: EventDto[] = [];
  id = 1;
  paramsSub?: Subscription;
  organization: any;

  constructor(private serv: CalendarService, private orgServ: OrganizationsService, private route: ActivatedRoute,) {
  }

  ngAfterViewInit() {
    console.log(this.reservations)
  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params) => {
      //this.id = params['id'];
      console.log(this.id)
      this.getOrganizationReservations();
    });
    this.orgServ.choose(this.id).subscribe({
      next: (res: Organization) => {
        this.organization = res;
      },
      //Dodaj kiedyś obsługę błędów jak wpadniesz na fajny pomysł jak to zrobić
      error: (err: HttpErrorResponse) => {
        console.error('An error occurred:', err);
      },
    });


    this.orgServ.getEvents(this.id).subscribe({
      next: (res: EventDto[]) => {
        this.events = res;
      },
      error: (err: HttpErrorResponse) => {
        console.error('An error occurred:', err);
      },
    });


    this.orgServ.getOrganizationReservations(this.id).subscribe({
      next: (res: Reservation[]) => {
        // Only temporarily TODO
        const alreadyAdded: number[] = [];

        for (const reservation of res) {
          if (alreadyAdded.includes(reservation.id)) {
            continue;
          }

          alreadyAdded.push(reservation.id);
          this.reservations.push(reservation);
        }
      },
    });
  }


  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    if (this.sidebarVisible) {
      this.sidebarIcon = 'pi pi-arrow-left';
      this.sidebarWidth = '25dvw';
      this.calendarMargin = '-5dvw'
    } else {
      this.sidebarIcon = 'pi pi-arrow-right';
      this.sidebarWidth = '0';
      this.calendarMargin = '0';
    }

    setTimeout(() => {
      this.serv.api.view.calendar.updateSize();
    }, 0);
  }

  getOrganizationReservations() {
    this.orgServ.getOrganizationReservations(this.id).subscribe({
      next: (res: Reservation[]) => {
        // Only temporarily TODO
        const alreadyAdded: number[] = [];

        for (const reservation of res) {
          if (alreadyAdded.includes(reservation.id)) {
            continue;
          }

          alreadyAdded.push(reservation.id);
          this.reservations.push(reservation);
        }
      },
    })
  }
}
