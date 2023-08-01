import { Component, Input } from '@angular/core';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
})
export class AddOrganizationComponent {
  uploadedFile: File | undefined;
  organizationName: string | undefined;
  imageURL: string = 'assets/img/organization.png';
  error :string | undefined;
  
  onFileSelectClicked(event: FileSelectEvent) {
    this.uploadedFile = event.files[0];
    this.imageURL = URL.createObjectURL(event.currentFiles[0]);
  }

  onClearClicked(event: Event) {
    this.imageURL = 'assets/img/organization.png';
    this.uploadedFile = undefined;
  }

  onSendClick(organization: string) {
    if(organization==undefined || organization.length<3 || organization.length>256)
    {
      this.error = "Nazwa organizacji musi posiadać od 2 do 256 znaków!";
      return;
    }
    this.error=undefined;
    URL.revokeObjectURL(this.imageURL)
    this.organizationName=organization;

    //handle sending data to backend
  }
}
