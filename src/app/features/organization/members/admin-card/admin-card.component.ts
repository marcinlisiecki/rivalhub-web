import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserDetailsDto} from "@interfaces/user/user-details-dto";
import {ConfirmationService} from "primeng/api";
import {OrganizationsService} from "@app/core/services/organizations/organizations.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@app/core/services/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {take} from "rxjs";

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent implements OnInit {

  @Input() user!: UserDetailsDto
  @Input() amIAdmin: boolean = false
  @Output() changedStatus = new EventEmitter<void>()

  private organizationId!: number
  private confirmKickMessage: string = "Na pewno chcesz usunąć tego członka?"
  private unAdminMessage: string = "Na pewno chcesz odebrać admina temu członkowi?"
  public adminButtonText: string = "Odbierz admina"
  public kickButtonText: string = "Wyrzuć";
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

  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return imageUrl;
    }

    return 'assets/img/avatars/avatarplaceholder.png';
  }

  loadMyself() {
    if (this.authService.getUserId() == this.user.id) {
      this.myself = true
    }
  }

  onKickAdmin(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.confirmKickMessage,
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.organizationService.kickUser(this.organizationId, this.user.id).subscribe({
          next: response => {
            this.changedStatus.emit()
          }
        })
        this.organizationService.unAdmin(this.organizationId, this.user.id).subscribe({
          next: response => {
            console.log("git")
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

  unAdmin(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.unAdminMessage,
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.organizationService.unAdmin(this.organizationId, this.user.id).subscribe({
          next: response => {
            this.changedStatus.emit()
          },
          error: HttpErrorResponse => {
            console.log('nie git')
          }
        })
      },
      reject: () => {}
    })
  }

  takeToUserProfile() {
    this.router.navigateByUrl(`profiles/${this.user.id}`).then()
  }

  protected readonly take = take;
}
