import { Component } from '@angular/core';
import { Organization } from 'src/app/core/interfaces/Organization';

@Component({
  selector: 'app-my-organizations',
  templateUrl: './my-organizations.component.html',
  styleUrls: ['./my-organizations.component.scss'],
})
export class MyOrganizationsComponent {
  organizations: Organization[] = [
    {
      id: 1,
      name: 'Organization 1 super fajna jest bardzo fajna',
      imageUrl: 'assets/img/avatars/avatarplaceholder.png',
    },
    {
      id: 2,
      name: 'NCDC',
      imageUrl: 'assets/img/avatars/ncdc.jpg',
    },
    {
      id: 3,
      name: 'Organization 3',
      imageUrl: 'assets/img/avatars/pzw.jpg',
    },
  ];

  createURL(id: number): string {
    return `/organization/${id}`;
  }

  isDefaultAvatar(imageUrl:string):boolean{
    return imageUrl.includes('avatarplaceholder'); //dunno if it's good
  }

  displayName(name:string):string{
    return name.length > 20 ? name.slice(0, 20) + '...' : name;
  }

}
