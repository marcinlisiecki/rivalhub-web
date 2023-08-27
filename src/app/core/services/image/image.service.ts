import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public DEFAULTORGANIZATIONAVATAR: string =
    '/assets/img/svg/defaultOrganization.svg';
  public DEFAULTUSERAVATAR: string = '/assets/img/avatars/user.png';
  constructor() {}

  getOrganizationImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return `${environment.apiUrl}/${imageUrl}`;
    }
    return this.DEFAULTORGANIZATIONAVATAR;
  }

  getUserImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return `${environment.apiUrl}/${imageUrl}`;
    }
    return this.DEFAULTUSERAVATAR;
  }

  checkDefaultAvatar(imageUrl: string | null): boolean {
    if (!imageUrl) {
      return true;
    }
    return imageUrl.includes('defaultOrganization.svg');
  }
}
