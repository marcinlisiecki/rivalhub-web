import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '@app/core/services/auth/auth.service';

import { NoResourceInfoComponent } from '@app/shared/no-resource-info/no-resource-info.component';
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';

import { HeroComponent } from '@app/features/landing/hero/hero.component';
import { RivalhubComponent } from '@app/features/landing/hero/rivalhub/rivalhub.component';
import { ex } from '@fullcalendar/core/internal-common';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuth']);

    TestBed.configureTestingModule({
      declarations: [HeroComponent, RivalhubComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        TranslateService,
        TranslateStore,

        { provide: AuthService, useValue: mockAuthService },
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

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the correct number of rivalhub logo in text', () => {
    fixture.detectChanges();

    const rivalhubLogo =
      fixture.nativeElement.querySelectorAll('app-rivalhub-logo');

    expect(rivalhubLogo.length).toEqual(2);
  });

  it('should not create div if user is not logged', () => {
    mockAuthService.isAuth.and.returnValue(false);
    component.value = mockAuthService.isAuth();
    const div = fixture.nativeElement.querySelector('.logged');

    expect(component.value).toBeFalse();
    expect(div).toBeFalsy();
  });

  it('should create div if user is logged', () => {
    mockAuthService.isAuth.and.returnValue(true);
    component.value = mockAuthService.isAuth();
    const div = fixture.nativeElement.querySelectorAll('.logged');

    expect(component.value).toBeTrue();
    expect(div).toBeTruthy();
  });
});
