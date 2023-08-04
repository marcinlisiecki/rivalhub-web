import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryStationsSelectorComponent } from './category-stations-selector.component';

describe('CategoryStationsSelectorComponent', () => {
  let component: CategoryStationsSelectorComponent;
  let fixture: ComponentFixture<CategoryStationsSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryStationsSelectorComponent]
    });
    fixture = TestBed.createComponent(CategoryStationsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
