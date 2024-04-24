import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNonOperationalDaysComponent } from './add-edit-non-operational-days.component';

describe('AddEditNonOperationalDaysComponent', () => {
  let component: AddEditNonOperationalDaysComponent;
  let fixture: ComponentFixture<AddEditNonOperationalDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditNonOperationalDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditNonOperationalDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
