import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionItemComponent } from './section-item.component';

describe('SectionItemComponent', () => {
  let component: SectionItemComponent;
  let fixture: ComponentFixture<SectionItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionItemComponent]
    });
    fixture = TestBed.createComponent(SectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
