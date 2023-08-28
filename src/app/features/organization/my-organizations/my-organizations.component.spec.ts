import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyOrganizationsComponent } from './my-organizations.component';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { InvitationsService } from '@app/core/services/invitations/invitations.service';
import { UsersService } from '@app/core/services/users/users.service';
import { ImageService } from '@app/core/services/image/image.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { NoResourceInfoComponent } from '@app/shared/no-resource-info/no-resource-info.component';
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';

import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { Organization } from '@app/core/interfaces/organization/organization';
import { Invitation } from '@app/core/interfaces/organization/invitation';
import { ButtonModule } from 'primeng/button';

const mockUser: UserDetailsDto = {
  id: 1,
  name: 'Zipperiusz',
  email: 'zipperiusz0@gmail.com',
  profilePictureUrl: 'https://i.imgur.com/6VBx3io.png',
  activationTime: null,
};

describe('MyOrganizationsComponent', () => {
  let component: MyOrganizationsComponent;
  let fixture: ComponentFixture<MyOrganizationsComponent>;
  let mockOrganizationsService: jasmine.SpyObj<OrganizationsService>;
  let mockInvitationsService: jasmine.SpyObj<InvitationsService>;
  let mockUsersService: jasmine.SpyObj<UsersService>;
  let mockImageService: jasmine.SpyObj<ImageService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockMessageService: MessageService;

  beforeEach(() => {
    mockOrganizationsService = jasmine.createSpyObj('OrganizationsService', [
      'getMy',
    ]);
    mockOrganizationsService.getMy.and.returnValue(of([]));

    mockInvitationsService = jasmine.createSpyObj('InvitationsService', [
      'removeInvitation',
      'checkIfAlreadyInOrganization',
    ]);
    mockInvitationsService.checkIfAlreadyInOrganization.and.returnValue(false);

    mockUsersService = jasmine.createSpyObj('UsersService', ['getMe']);
    mockUsersService.getMe.and.returnValue(of(mockUser));

    mockImageService = jasmine.createSpyObj('ImageService', [
      'getOrganizationImagePath',
      'checkDefaultAvatar',
    ]);
    mockImageService.checkDefaultAvatar.and.returnValue(true);

    mockAuthService = jasmine.createSpyObj('AuthService', ['getUserId']);
    mockAuthService.getUserId.and.returnValue(1);

    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      declarations: [MyOrganizationsComponent, NoResourceInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ButtonModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        TranslateService,
        TranslateStore,

        { provide: OrganizationsService, useValue: mockOrganizationsService },
        { provide: InvitationsService, useValue: mockInvitationsService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: ImageService, useValue: mockImageService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: MessageService, useValue: mockMessageService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: { registered: 'false' },
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(MyOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the correct number of organization cards', () => {
    const mockOrganizations: Organization[] = [
      {
        id: 1,
        name: 'Organization 1',
        color: '#000000',
        imageUrl: 'https://i.imgur.com/6VBx3io.png',
        invitationHash: 'hash',
      },
      {
        id: 2,
        name: 'Organization 2',
        color: '#FF0000',
        imageUrl: 'https://example.com/image2.png',
        invitationHash: 'hash2',
      },
      {
        id: 3,
        name: 'Organization 3',
        color: '#00FF00',
        imageUrl: 'https://example.com/image3.png',
        invitationHash: 'hash3',
      },
      {
        id: 4,
        name: 'Organization 4',
        color: '#0000FF',
        imageUrl: 'https://example.com/image4.png',
        invitationHash: 'hash4',
      },
      {
        id: 5,
        name: 'Organization 5',
        color: '#FFFF00',
        imageUrl: 'https://example.com/image5.png',
        invitationHash: 'hash5',
      },
    ];

    component.organizations = mockOrganizations;

    fixture.detectChanges();

    const organizationCardElements =
      fixture.nativeElement.querySelectorAll('.organization-card');

    expect(organizationCardElements.length).toEqual(5);
  });

  it('should create link to create organization if user is not in any organization', () => {
    const mockOrganizations: Organization[] = [];

    component.organizations = mockOrganizations;

    fixture.detectChanges();

    const organizationCardElements =
      fixture.nativeElement.querySelectorAll('.organization-card');

    expect(organizationCardElements.length).toEqual(0);

    const createOrganizationElement =
      fixture.nativeElement.querySelector('.no-organizations');

    expect(createOrganizationElement).toBeTruthy();
  });

  it('should create the correct number of invitations', () => {
    const mockInvitations: Invitation[] = [
      {
        hash: 'hash1',
        userId: 1,
        organization: {
          name: 'NCDC',
          id: 1,
        },
      },
    ];

    component.invitations = mockInvitations;

    fixture.detectChanges();

    const invitationCardElements =
      fixture.nativeElement.querySelectorAll('.invitation');

    expect(invitationCardElements.length).toEqual(1);
  });

  it('should create information about no invitations if there are no invitations', () => {
    const mockInvitations: Invitation[] = [];

    component.invitations = mockInvitations;

    fixture.detectChanges();

    const invitationCardElements =
      fixture.nativeElement.querySelectorAll('.invitation');

    expect(invitationCardElements.length).toEqual(0);

    const noInvitationsElement = fixture.nativeElement.querySelector(
      'app-no-resource-info',
    );

    expect(noInvitationsElement).toBeTruthy();
  });

  it('should set isAccountVerified to true when activationTime is not null', () => {
    const mockUser: UserDetailsDto = {
      id: 1,
      name: 'Mock User',
      email: 'mock@example.com',
      profilePictureUrl: 'https://example.com/profile.png',
      activationTime: new Date(),
    };

    mockUsersService.getMe.and.returnValue(of(mockUser));

    component.checkIfAccountIsVerified();

    expect(component.isAccountVerified).toBeTrue();
  });

  it('should set isAccountVerified to false when activationTime is null', () => {
    const mockUser: UserDetailsDto = {
      id: 2,
      name: 'Mock User',
      email: 'mock@example.com',
      profilePictureUrl: 'https://example.com/profile.png',
      activationTime: null,
    };

    mockUsersService.getMe.and.returnValue(of(mockUser));

    component.checkIfAccountIsVerified();

    expect(component.isAccountVerified).toBeFalse();
  });

  it('should disable buttons when activationTime is null', () => {
    const mockUser: UserDetailsDto = {
      id: 1,
      name: 'Mock User',
      email: 'mock@example.com',
      profilePictureUrl: 'https://example.com/profile.png',
      activationTime: null,
    };
    const mockInvitations: Invitation[] = [
      {
        hash: 'hash1',
        userId: 1,
        organization: {
          name: 'NCDC',
          id: 1,
        },
      },
    ];
    component.invitations = mockInvitations;

    mockUsersService.getMe.and.returnValue(of(mockUser));

    component.checkIfAccountIsVerified();

    fixture.detectChanges();

    const acceptButton =
      fixture.nativeElement.querySelector('.p-button-success');
    const rejectButton =
      fixture.nativeElement.querySelector('.p-button-danger');

    expect(acceptButton.disabled).toBeTruthy();
    expect(rejectButton.disabled).toBeTruthy();
  });

  it('should enable buttons when activationTime is not null', () => {
    const mockUser: UserDetailsDto = {
      id: 1,
      name: 'Mock User',
      email: 'mock@example.com',
      profilePictureUrl: 'https://example.com/profile.png',
      activationTime: new Date(),
    };
    const mockInvitations: Invitation[] = [
      {
        hash: 'hash1',
        userId: 1,
        organization: {
          name: 'NCDC',
          id: 1,
        },
      },
    ];
    component.invitations = mockInvitations;

    mockUsersService.getMe.and.returnValue(of(mockUser));

    component.checkIfAccountIsVerified();

    fixture.detectChanges();

    const acceptButton =
      fixture.nativeElement.querySelector('.p-button-success');
    const rejectButton =
      fixture.nativeElement.querySelector('.p-button-danger');

    expect(acceptButton.disabled).toBeFalsy();
    expect(rejectButton.disabled).toBeFalsy();
  });
});
