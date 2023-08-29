import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@app/core/services/auth/auth.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  private organizationId!: number;
  private isLoading = false;
  private currentPage = 0;
  private itemsPerPage = 15;
  public users!: UserDetailsDto[];
  public adminUsers!: UserDetailsDto[];
  public filteredUsers: UserDetailsDto[] = [];
  private adminIds!: number[];

  public searchQuery: string = '';
  public noMore: boolean = false;
  public amIAdmin!: boolean;
  private paramsSub?: Subscription

  toggleLoading = () => (this.isLoading = !this.isLoading);

  constructor(
    private organizationService: OrganizationsService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params) => {
      this.organizationId = params['id'];
      this.amIAdmin = this.authService.amIAdmin(this.organizationId);
      this.loadData();
    });



    // TODO debounce 500 ms
  }

  loadData() {
    this.organizationService.getAdminUsersIds(this.organizationId).subscribe({
      next: (response) => {
        this.adminUsers = response;
        this.adminIds = this.adminUsers.map((user) => user.id);
        this.loadUsers();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.error);
      },
    });
  }

  loadUsers = () => {
    this.currentPage = 0;
    this.toggleLoading();
    this.organizationService
      .getUsers(this.organizationId, this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          this.users = response.content;
          this.users = this.users.filter(
            (user) => !this.adminIds.includes(user.id),
          );
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.error);
        },
        complete: () => this.toggleLoading(),
      });
  };

  appendUsers = () => {
    if (this.users.length == 0) {
      this.loadUsers();
    }
    this.toggleLoading();
    this.organizationService
      .getUsers(this.organizationId, this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          this.users = [...this.users, ...response.content];
          this.users = this.users.filter(
            (user) => !this.adminIds.includes(user.id),
          );
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.error.message);
          this.noMore = true;
        },
        complete: () => this.toggleLoading(),
      });
  };

  onScroll = () => {
    this.currentPage++;
    this.appendUsers();
  };

  onSearchInputChange = () => {
    this.currentPage = 0;
    this.filterUsers();
    this.loadData();
  };

  filterUsers() {
    const namePhrase = this.searchQuery.toLowerCase();
    this.organizationService
      .getUsersByNamePhrase(this.organizationId, namePhrase)
      .subscribe({
        next: (response) => {
          this.filteredUsers = response;
          this.filteredUsers = this.filteredUsers.filter(
            (user) => !this.adminIds.includes(user.id),
          );
        },
      });
  }

  onChangeStatus() {
    this.ngOnInit();
  }
}
