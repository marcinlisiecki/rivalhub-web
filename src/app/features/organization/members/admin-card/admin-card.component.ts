import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { ConfirmationService, MenuItemCommandEvent } from 'primeng/api';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { ImageService } from '@app/core/services/image/image.service';
import { LanguageService } from '@app/core/services/language/language.service';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { EventType } from '@interfaces/event/event-type';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss'],
})
export class AdminCardComponent implements OnInit {
  @Input() user!: UserDetailsDto;
  @Input() amIAdmin: boolean = false;
  @Output() changedStatus = new EventEmitter<void>();
  @Input({ required: true }) eventTypes: EventType[] = [];

  private organizationId!: number;
  private confirmKickMessage: string = this.languageService.instant(
    'organization.confirmKickMessage',
  );
  private unAdminMessage: string = this.languageService.instant(
    'organization.unAdminMessage',
  );
  public adminButtonText: string = this.languageService.instant(
    'organization.adminButtonText',
  );
  public kickButtonText: string = this.languageService.instant(
    'organization.kickButtonText',
  );
  public myself: boolean = false;
  imageUrl!: string;
  items: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private organizationService: OrganizationsService,
    private router: Router,
    private authService: AuthService,
    private imageService: ImageService,
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.organizationId = params['id'];
      this.loadMyself();
      this.imageUrl = this.imageService.getUserImagePath(
        this.user.profilePictureUrl,
      );
    });

    this.items = [
      ...this.eventTypes.map((item) => ({
        label: this.languageService.instant(categoryTypeToLabel(item)),
        command: (_: MenuItemCommandEvent) =>
          this.navigateToNewEvent(item as EventType),
      })),
    ];
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

  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return imageUrl;
    }

    return 'assets/img/avatars/avatarplaceholder.png';
  }

  loadMyself() {
    if (this.authService.getUserId() == this.user.id) {
      this.myself = true;
    }
  }

  onKickAdmin(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.confirmKickMessage,
      acceptLabel: this.languageService.instant('common.yes'),
      rejectLabel: this.languageService.instant('common.no'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.organizationService
          .kickUser(this.organizationId, this.user.id)
          .subscribe({
            next: (response) => {
              this.changedStatus.emit();
            },
          });
        this.organizationService
          .unAdmin(this.organizationId, this.user.id)
          .subscribe({
            next: (response) => {},
          });
      },
      reject: () => {},
    });
  }

  onChallenge() {
    this.router
      .navigate(['organizations', this.organizationId, 'events', 'new'], {
        queryParams: {
          challengeId: this.user.id,
          challengeName: this.user.name,
        },
      })
      .then();
  }

  unAdmin(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.unAdminMessage,
      acceptLabel: this.languageService.instant('common.yes'),
      rejectLabel: this.languageService.instant('common.no'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.organizationService
          .unAdmin(this.organizationId, this.user.id)
          .subscribe({
            next: (response) => {
              this.changedStatus.emit();
            },
            error: (HttpErrorResponse) => {
              console.error(HttpErrorResponse);
            },
          });
      },
      reject: () => {},
    });
  }

  takeToUserProfile() {
    this.router.navigateByUrl(`profiles/${this.user.id}`).then();
  }

  protected readonly take = take;
}
