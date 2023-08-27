import { Component, Input, OnInit } from '@angular/core';

import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { ImageService } from '@app/core/services/image/image.service';
import { EventType } from '@interfaces/event/event-type';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  @Input({ required: true }) user!: UserDetailsDto;
  @Input({ required: true }) eventTypes: EventType[] = [];

  items?: MenuItem[];
  imageUrl!: string;
  organizationId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private imageService: ImageService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.params['id'];

    const challengeItem: MenuItem = {
      label: this.languageService.instant('organization.challenge'),
      icon: 'pi pi-bolt',

      items: [
        ...this.eventTypes.map((item) => ({
          label: this.languageService.instant(categoryTypeToLabel(item)),
          command: (_: MenuItemCommandEvent) =>
            this.navigateToNewEvent(item as EventType),
        })),
      ],
    };

    const profileItem: MenuItem = {
      label: this.languageService.instant('organization.showProfile'),
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

    this.imageUrl = this.imageService.getUserImagePath(
      this.user.profilePictureUrl,
    );
  }

  navigateToNewEvent(type: EventType) {
    this.router
      .navigate(['organizations', this.organizationId, 'events', 'new'], {
        queryParams: {
          challengeId: this.user.id,
          challengeType: type,
        },
      })
      .then();
  }
}
