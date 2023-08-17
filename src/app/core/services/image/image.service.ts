import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return `${environment.apiUrl}/${imageUrl}`;
    }
    return '/assets/img/svg/defaultOrganization.svg';
  }
}
