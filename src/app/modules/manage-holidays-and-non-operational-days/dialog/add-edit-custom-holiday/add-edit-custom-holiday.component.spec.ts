import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomHolidayComponent } from './add-edit-custom-holiday.component';

describe('AddEditCustomHolidayComponent', () => {
  let component: AddEditCustomHolidayComponent;
  let fixture: ComponentFixture<AddEditCustomHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomHolidayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCustomHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
