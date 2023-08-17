import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from "@app/core/services/organizations/organizations.service";
import {ActivatedRoute} from "@angular/router";
import {UserDetailsDto} from "@interfaces/user/user-details-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "@app/core/services/auth/auth.service";
import {JwtService} from "@app/core/services/jwt/jwt.service";
// import {debounce, debounceTime, distinctUntilChanged, Subject} from "rxjs";


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  private organizationId!: number
  public isLoading = false
  private currentPage = 0
  private itemsPerPage = 15
  public users!: UserDetailsDto[]

  public searchQuery: string = ''
  public filteredUsers: UserDetailsDto[] = []
  public noMore: boolean = false
  public amIAdmin!: boolean

  toggleLoading = () => this.isLoading = !this.isLoading

  constructor(
    private organizationService: OrganizationsService,
    private router: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.organizationId = params['id']
    })
    this.amIAdmin = this.authService.amIAdmin(this.organizationId)

    this.loadData()
    // TODO debounce 500 ms
  }


  // filterUsers() {
  //   if (this.searchQuery) {
  //     this.filteredUsers = this.allUsers.filter(user =>
  //       user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     );
  //   } else {
  //     this.filteredUsers = this.allUsers;
  //   }
  // }

  loadData = () => {
    this.toggleLoading()
    this.organizationService.getUsers(this.organizationId, this.currentPage, this.itemsPerPage).subscribe({
      next: response => {
        this.users = response.content
        // console.log(this.users)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error)
      },
      complete: () => this.toggleLoading()
    })
  }

  appendData = () => {
    this.toggleLoading()
    this.organizationService.getUsers(this.organizationId, this.currentPage, this.itemsPerPage).subscribe({
      next: response => {
        this.users = [...this.users,...response.content]
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.noMore = true
      },
      complete: () => this.toggleLoading()
    })
  }

  onScroll = () => {
    this.currentPage++
    this.appendData()
  }

  onSearchInputChange = () => {
    this.currentPage = 0;
    this.filterUsers()
    this.loadData()
  }

  filterUsers() {
    const namePhrase = this.searchQuery.toLowerCase()
    this.organizationService.getUsersByNamePhrase(this.organizationId, namePhrase).subscribe({
      next: response => {
        this.filteredUsers = response;
      }
    })
  }

  onKickUser(index: number) {
    this.users.splice(index, 1)
    this.filteredUsers.splice(index, 1)
  }
}
