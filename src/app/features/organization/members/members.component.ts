import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from "@app/core/services/organizations/organizations.service";
import {ActivatedRoute} from "@angular/router";
import {UserDetailsDto} from "@interfaces/user/user-details-dto";
import {HttpErrorResponse} from "@angular/common/http";
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
  // searchQueryUpdate = new Subject<string>()

  toggleLoading = () => this.isLoading = !this.isLoading

  constructor(
    private organizationService: OrganizationsService,
    private router: ActivatedRoute,
  ) {
    // this.searchQueryUpdate.pipe(
    //   debounceTime(2000),
    //   distinctUntilChanged())
    //   .subscribe(value => {
    //     this.searchQuery = value
    //   })
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.organizationId = params['id']
    })
    this.loadData()

    // wywalic i w search barze do backendu od razu // debounce 500 ms
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
}
