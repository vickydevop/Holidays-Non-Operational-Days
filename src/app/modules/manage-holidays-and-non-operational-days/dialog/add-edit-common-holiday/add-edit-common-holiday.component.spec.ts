import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCommonHolidayComponent } from './add-edit-common-holiday.component';

describe('AddEditCommonHolidayComponent', () => {
  let component: AddEditCommonHolidayComponent;
  let fixture: ComponentFixture<AddEditCommonHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCommonHolidayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCommonHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
