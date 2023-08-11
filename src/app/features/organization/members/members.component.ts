import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from "@app/core/services/organizations/organizations.service";
import {ActivatedRoute} from "@angular/router";
import {UserDetailsDto} from "@interfaces/user/user-details-dto";
import {HttpErrorResponse} from "@angular/common/http";

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

  public allUsers: UserDetailsDto[] = []
  public searchQuery: string = ''
  public filteredUsers: UserDetailsDto[] = []
  public noMore: boolean = false

  toggleLoading = () => this.isLoading = !this.isLoading

  constructor(
    private organizationService: OrganizationsService,
    private router: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.organizationId = params['id']
    })
    this.loadData()
    this.loadAllUsers()
  }

  loadAllUsers = () => {
    this.organizationService.getAllUsers(this.organizationId).subscribe({
        next: (response: UserDetailsDto[]) => {
          this.allUsers = response
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error)
        }
    })
  }

  filterUsers() {
    if (this.searchQuery) {
      this.filteredUsers = this.allUsers.filter(user =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredUsers = this.allUsers;
    }
  }

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
  }
}
