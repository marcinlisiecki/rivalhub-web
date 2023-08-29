import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { AuthService } from '@app/core/services/auth/auth.service';
import { InvitationsService } from '@app/core/services/invitations/invitations.service';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageModule } from 'primeng/message';
import { LayoutModule } from '@app/core/layout/layout.module';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpLoaderFactory } from '@app/app.module';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  let mockAuthService: any;
  let mockInvitationService;
  let mockActivatedRoute;
  let router: Router;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['register']);
    mockAuthService.register.and.returnValue(
      of({
        token: 'token',
        refreshToken: 'refresh',
      }),
    );

    mockInvitationService = jasmine.createSpyObj(['setUserIds']);
    mockActivatedRoute = {};

    TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [
        CommonModule,
        PasswordModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MessageModule,
        LayoutModule,
        TranslateModule,
        RouterLink,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
          },
        }),
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: InvitationsService, useValue: mockInvitationService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        TranslateService,
      ],
    });
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.registerForm.get('email')).toBeTruthy();
    expect(component.registerForm.get('name')).toBeTruthy();
    expect(component.registerForm.get('password')).toBeTruthy();
  });

  it('should make form invalid when provided incorrect email', () => {
    component.registerForm.setValue({
      email: 'invalidemail',
      name: 'Test',
      password: 'password',
    });

    component.onSubmit();
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should display error message when provided too short name', () => {
    component.registerForm.setValue({
      email: 'test@example.com',
      name: 't',
      password: 'testpassword',
    });

    component.onSubmit();
    fixture.detectChanges();

    const validationErrorElement = fixture.debugElement.query(
      By.css('.validation-error'),
    );

    expect(validationErrorElement).toBeTruthy();
    expect(validationErrorElement.nativeElement.textContent).toEqual(
      'input.userNameMin',
    );
  });

  it('should make form valid if all data provided was correct', () => {
    spyOn(component, 'onSubmit');

    component.registerForm.setValue({
      email: 'test@example.com',
      name: 'Test',
      password: 'password',
    });

    component.onSubmit();
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should not call register() if form is not valid', () => {
    component.registerForm.setValue({
      email: 'invalidemail',
      name: 'Test',
      password: 'password',
    });

    component.onSubmit();
    expect(mockAuthService.register).not.toHaveBeenCalled();
  });

  it('should call register() and redirect if form is valid', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    component.registerForm.setValue({
      email: 'test@example.com',
      name: 'Test',
      password: 'password',
    });
    component.onSubmit();

    expect(mockAuthService.register).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith('/organizations?registered=true');
  });
});
