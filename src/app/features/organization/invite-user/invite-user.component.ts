import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent {

  inviteForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  get email() {
    return this.inviteForm.get('email')
  }

  onSubmit() {

  }
}
