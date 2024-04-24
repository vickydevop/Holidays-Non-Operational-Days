import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomNonOperationalDaysComponent } from './add-edit-custom-non-operational-days.component';

describe('AddEditCustomNonOperationalDaysComponent', () => {
  let component: AddEditCustomNonOperationalDaysComponent;
  let fixture: ComponentFixture<AddEditCustomNonOperationalDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomNonOperationalDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCustomNonOperationalDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
