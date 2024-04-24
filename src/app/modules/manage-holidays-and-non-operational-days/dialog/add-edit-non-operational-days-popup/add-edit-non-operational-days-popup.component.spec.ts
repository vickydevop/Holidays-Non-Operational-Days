import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNonOperationalDaysPopupComponent } from './add-edit-non-operational-days-popup.component';

describe('AddEditNonOperationalDaysPopupComponent', () => {
  let component: AddEditNonOperationalDaysPopupComponent;
  let fixture: ComponentFixture<AddEditNonOperationalDaysPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditNonOperationalDaysPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditNonOperationalDaysPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
