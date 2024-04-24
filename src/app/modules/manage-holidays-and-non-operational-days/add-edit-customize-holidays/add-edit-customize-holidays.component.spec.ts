import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomizeHolidaysComponent } from './add-edit-customize-holidays.component';

describe('AddEditCustomizeHolidaysComponent', () => {
  let component: AddEditCustomizeHolidaysComponent;
  let fixture: ComponentFixture<AddEditCustomizeHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomizeHolidaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCustomizeHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
