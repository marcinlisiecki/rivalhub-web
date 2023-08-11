import { Component, Input, OnInit } from '@angular/core';

import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  @Input({ required: true }) user!: UserDetailsDto;
  items?: MenuItem[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const organizationId = this.route.snapshot.params['id'];

    const challengeItem: MenuItem = {
      label: 'Rzuć wyzwanie',
      icon: 'pi pi-bolt',
      command: (event: MenuItemCommandEvent) => {
        this.router
          .navigateByUrl(
            `/organizations/${organizationId}/events/new?challenge=${this.user.id}`,
          )
          .then();
      },
    };

    const profileItem: MenuItem = {
      label: 'Zobacz profil',
      icon: 'pi pi-user',
    };

    if (this.authService.getUserId() !== this.user.id) {
      this.items = [profileItem, challengeItem];
    } else {
      this.items = [profileItem];
    }
  }

  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return imageUrl;
    }

    return '/assets/img/avatars/user.png';
  }
}
