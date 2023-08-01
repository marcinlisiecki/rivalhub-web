import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrganizationsComponent } from './my-organizations.component';

describe('MyOrganizationsComponent', () => {
  let component: MyOrganizationsComponent;
  let fixture: ComponentFixture<MyOrganizationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyOrganizationsComponent]
    });
    fixture = TestBed.createComponent(MyOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
