import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerCompactAnimation } from '@app/core/animations/header-animation';
import { ImageService } from '@app/core/services/image/image.service';
import { Organization } from '@interfaces/organization/organization';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss'],
})
export class DashboardProfileComponent implements OnInit {
  @Input({ required: true }) user!: UserDetailsDto;
  @Input() compact: boolean = false;
  @Input() isMe!: boolean;
  imageUrl!: string;

  constructor(
    private router: Router,
    private imageService: ImageService,
  ) {}
  ngOnInit(): void {
    this.imageUrl = this.imageService.getUserImagePath(
      this.user.profilePictureUrl,
    );
  }

  goToEdit(): void {
    this.router.navigateByUrl(`/profiles/${this.user.id}/edit`).then();
  }
}
