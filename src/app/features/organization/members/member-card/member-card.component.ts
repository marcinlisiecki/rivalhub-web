import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserDetailsDto} from "@interfaces/user/user-details-dto";
import {ConfirmationService} from "primeng/api";
import {OrganizationsService} from "@app/core/services/organizations/organizations.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@app/core/services/auth/auth.service";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() user!: UserDetailsDto
  @Input() amIAdmin: boolean = false
  @Output() kicked = new EventEmitter<void>()
  @Output() admined = new EventEmitter<void>()

  private organizationId!: number
  private confirmKickMessage: string = "Na pewno chcesz usunąć tego członka?"
  public adminButtonText: string = "Nadaj uprawnienia admina"
  public kickButtonText: string = "Wyrzuć";
  private grantAdminMessage: string = "Na pewno chcesz dać admina temu członkowi?"
  public myself: boolean = false

  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private organizationService: OrganizationsService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.organizationId = params['id'];
    });
    this.loadMyself()
  }

  loadMyself() {
    if (this.authService.getUserId() == this.user.id) {
      this.myself = true
      this.kickButtonText = "Wyjdź"
      this.confirmKickMessage = "Czy napewno chcesz wyjść z organizacji?"
    }
  }

  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return imageUrl;
    }

    return 'assets/img/avatars/avatarplaceholder.png';
  }

  onKickUser(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.confirmKickMessage,
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.organizationService.kickUser(this.organizationId, this.user.id).subscribe({
          next: response => {
            this.kicked.emit()
          }
        })
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

  grantAdmin(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.grantAdminMessage,
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.organizationService.grantAdmin(this.organizationId, this.user.id).subscribe({
          next: response => {
            this.admined.emit()
          }
        })
      },
      reject: () => {}
    })
  }
}
