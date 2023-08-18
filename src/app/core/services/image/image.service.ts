import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  getOrganizationImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return `${environment.apiUrl}/${imageUrl}`;
    }
    return '/assets/img/svg/defaultOrganization.svg';
  }

  getUserImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return `${environment.apiUrl}/${imageUrl}`;
    }
    return '/assets/img/avatars/user.png';
  }

  checkDefaultAvatar(imageUrl: string | null): boolean {
    if (!imageUrl) {
      return true;
    }
    return imageUrl.includes('defaultOrganization.svg');
  }
}
