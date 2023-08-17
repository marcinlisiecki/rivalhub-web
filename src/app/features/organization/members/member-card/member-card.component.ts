import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserDetailsDto} from "@interfaces/user/user-details-dto";
import {ConfirmationService} from "primeng/api";
import {OrganizationsService} from "@app/core/services/organizations/organizations.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() user!: UserDetailsDto
  @Input() amIAdmin: boolean = false
  @Output() kicked = new EventEmitter<void>()

  private organizationId!: number

  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private organizationsService: OrganizationsService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.organizationId = params['id'];
    });
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
      message: 'Na pewno chcesz usunąć tego członka?',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.organizationsService.deleteUser(this.organizationId, this.user.id).subscribe({
          next: response => {
            this.kicked.emit()
          }
        })
      },
      reject: () => {},
    });
  }
}
