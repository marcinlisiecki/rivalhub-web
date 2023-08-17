import { Component, Input, OnInit } from '@angular/core';

import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { ImageService } from '@app/core/services/image/image.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  @Input({ required: true }) user!: UserDetailsDto;
  items?: MenuItem[];
  profileImg = this.imageService.getImagePath(this.user.profilePictureUrl);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    const organizationId = this.route.snapshot.params['id'];

    const challengeItem: MenuItem = {
      label: 'Rzuć wyzwanie',
      icon: 'pi pi-bolt',
      command: (_: MenuItemCommandEvent) => {
        this.router
          .navigate(['organizations', organizationId, 'events', 'new'], {
            queryParams: {
              challengeId: this.user.id,
              challengeName: this.user.name,
            },
          })
          .then();
      },
    };

    const profileItem: MenuItem = {
      label: 'Zobacz profil',
      icon: 'pi pi-user',
      command: (_: MenuItemCommandEvent) => {
        this.router.navigate(['profiles', this.user.id]).then();
      },
    };

    if (this.authService.getUserId() !== this.user.id) {
      this.items = [profileItem, challengeItem];
    } else {
      this.items = [profileItem];
    }
  }
}
