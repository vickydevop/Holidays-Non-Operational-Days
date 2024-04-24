import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeNonOperationalDaysComponent } from './customize-non-operational-days.component';

describe('CustomizeNonOperationalDaysComponent', () => {
  let component: CustomizeNonOperationalDaysComponent;
  let fixture: ComponentFixture<CustomizeNonOperationalDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeNonOperationalDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizeNonOperationalDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
