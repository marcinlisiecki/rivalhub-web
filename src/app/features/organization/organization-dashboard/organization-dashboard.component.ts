import { Component, HostListener } from '@angular/core';
import { UserDto } from '@interfaces/UserDto';
import { Organization } from '@interfaces/Organization';
import { EventDto } from '@app/core/interfaces/EventDto';
import { navAnimation } from '@app/core/animations/nav-animation';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss'],
  animations: [navAnimation],
})
export class OrganizationDashboardComponent {
  navVisible: boolean = false;
  toggleNav() {
    this.navVisible = !this.navVisible;
  }
  mobileView: boolean = window.innerWidth <= 768 ? true : false;
  //update mobileView on window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobileView = event.target.innerWidth <= 768;
  }

  events: EventDto[] = [
    {
      id: 1,
      name: 'Wędkowanie na jeziorze',
      place: 'Jezioro',
      date: new Date(),
      beginEndTime: '10:00 - 14:00',
      participantIds: [5],
    },
    {
      id: 2,
      name: 'Wędkowanie na rzece',
      place: 'Rzeka',
      date: new Date(),
      beginEndTime: '10:00 - 14:00',
      participantIds: [1, 2],
    },
    {
      id: 3,
      name: 'Wędkowanie na stawie',
      place: 'Staw',
      date: new Date(),
      beginEndTime: '10:00 - 14:00',
      participantIds: [2, 3, 4],
    },
  ];

  organization: Organization = {
    id: 1,
    name: 'Polski Związek Wędkarski',
    imageUrl: 'assets/img/avatars/pzw.jpg',
  };

  users: UserDto[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'JohnDoe@gmail.com',
      imageUrl: 'assets/img/avatars/user.png',
      role: 'Admin',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'JaneDoe@gmail.com',
      imageUrl: 'assets/img/avatars/user.png',
      role: 'Member',
    },
    {
      id: 3,
      firstName: 'Jacob',
      lastName: 'Dwayne',
      email: 'JacobDwayne@gmail.com',
      imageUrl: 'assets/img/avatars/user.png',
      role: 'Member',
    },
    {
      id: 4,
      firstName: 'Albert',
      lastName: 'Smart',
      email: 'AlbertSmart@gmail.com',
      imageUrl: 'assets/img/avatars/user.png',
      role: 'Member',
    },
    {
      id: 5,
      firstName: 'Alice',
      lastName: 'Rabbit',
      email: 'AliceRabbit@gmail.com',
      imageUrl: 'assets/img/avatars/user.png',
      role: 'Member',
    },
    {
      id: 6,
      firstName: 'Mark',
      lastName: 'Parker',
      email: 'MarkParker@gmail.com',
      imageUrl: 'assets/img/avatars/user.png',
      role: 'Member',
    },
  ];
}
