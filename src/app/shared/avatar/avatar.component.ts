import { Component, Input, OnInit } from '@angular/core';
import { AddEventUser } from '@app/core/interfaces/event/add-event-user';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { ImageService } from '@app/core/services/image/image.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input({ required: true }) user!: UserDetailsDto | AddEventUser;

  constructor(private imageService: ImageService) {}
  avatarUrl!: string;
  ngOnInit(): void {
    this.avatarUrl = this.imageService.getUserImagePath(
      this.user.profilePictureUrl,
    );
  }
}
