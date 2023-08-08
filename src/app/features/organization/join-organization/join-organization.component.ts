import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationsService} from "@app/core/services/organizations/organizations.service";
import {AuthService} from "@app/core/services/auth/auth.service";
import {Organization} from "@interfaces/organization/organization";

@Component({
  selector: 'app-join-organization',
  templateUrl: './join-organization.component.html',
  styleUrls: ['./join-organization.component.scss']
})
export class JoinOrganizationComponent implements OnInit {
  public organizationName: string = ''
  public organizationId: number = -1
  public organizationHash: string = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationsService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.organizationId = params['id']
      this.organizationHash = params['hash']
    })
      if (!this.authService.isAuth()) {
        this.organizationService.addUserToOrganization(this.organizationId, this.organizationHash).subscribe(
          response => {
            alert("Tutaj chyba nigdy nie wejdziesz (?)")
          },
          error => {
            // przekieruj do logowania
            sessionStorage.setItem("redirectUrl", `/organizations/${(this.organizationId)}/invitation/${(this.organizationHash)}`)
            this.router.navigateByUrl('/login').then()
          }
        )
      } else {
        this.organizationService.choose(this.organizationId).subscribe(
            response => {
                this.organizationName = response.name
            }
        )
      }

  }

  onSubmit() {
    if (this.organizationId == -1) {
      return
    }
    if (!this.organizationHash) {
      return
    }

    this.organizationService.addUserToOrganization(this.organizationId, this.organizationHash).subscribe(
      (organization) => {
        this.router.navigateByUrl('/organizations').then()
      },
      (error) => {
        // 404 jestes juz czlonkiem tej organizacji
        console.log(error)
      }
    )
  }
}
