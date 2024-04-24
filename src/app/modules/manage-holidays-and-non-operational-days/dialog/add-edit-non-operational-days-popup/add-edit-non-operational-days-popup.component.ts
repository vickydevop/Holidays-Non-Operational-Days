import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-add-edit-non-operational-days-popup',
  templateUrl: './add-edit-non-operational-days-popup.component.html',
  styleUrls: ['./add-edit-non-operational-days-popup.component.scss'],
})
export class AddEditNonOperationalDaysPopupComponent implements OnInit {
  getdate!: any;
  date!: any;
  // dataSource: any;
  isInserting: boolean = false;
  isEditing: boolean = false;
  isDateDisabled: any;
  disabledDates: any[] = [];

  constructor(
    public addnew: MatDialogRef<AddEditNonOperationalDaysPopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public _apiService: ApiService,
    public _dateshare: DataSharingService,
    private _snackbar: SnackBarService,
    private _spinner: CustomSpinnerService,
    private datepipe: DatePipe
  ) {}

  form = new FormGroup({
    Date: new FormControl('', Validators.required),
  });

  onNoClick(): void {
    this.addnew.close({ event: true, data: this.add_edit });
  }
  date_values: any;
  add_edit: any = 0;
  min_date: any;
  ngOnInit(): void {
    this.min_date = new Date();
    // console.log(this.data,'ngonit')
    // console.log(this.add_edit,'aaaa');
    // this._apiService.getCommonHolidayscount().subscribe((res) => {
    //   this.dataSource = res.data;
    //   console.log(this.data,this.dataSource, "dialog data");

    // })
    // console.log(this.data,"data");
    if (this.data.isInserting != true) {
      this.getdate = this.form
        .get('Date')
        ?.setValue(this.data.rowvalue[0].common_non_operational_day_date);
      // console.log(this.getdate, "date");

      this.date = convertDatePickerTimeToMySQLTime(this.getdate);
      // console.log(this.date, "d");
    }

    // for hide dates
    this.date_values = this.data?.table_values;
    // console.log(this.date_values,'this.dataSource');

    this.isDateDisabled = (d: Date): boolean => {
      const dateString = DateTime.fromISO(d?.toISOString().slice(0, 10))
        .plus({ days: 1 })
        .toISODate();
      // console.log(this.date_values);
      if (this.date_values != undefined) {
        for (let i = 0; i < this.date_values.length; i++) {
          // console.log('if',this.date_values[i].common_holiday_date)
          if (dateString === this.date_values[i].common_non_operational_day_date) {
            return false; // Disable the date
          }
        }
      }
      return true; // Enable the date
    };
  }
  daysSelected: any[] = [];
  selected_date: any;
  popup_status:any = 0;
  AddEdit() {
    // console.log(this.data)
    this.getdate = this.form.get('Date')?.value;
    // console.log(this.getdate, "date");

    this.date = convertDatePickerTimeToMySQLTime(this.getdate);
    // console.log(this.date, "d");
    this._spinner.open();
      this._apiService.postNonOperationalDays(this.date).subscribe({
        next:(res)=>{
        this._spinner.close();
        this.popup_status = 1;
        this.addnew.close({event:true, data: this.popup_status});
        },error:()=>{
        this.popup_status = 0;
        this._spinner.close();
        }
      })
  }
}

export function convertDatePickerTimeToMySQLTime(str: any) {
  var month, day, year, hours, minutes, seconds;
  var date = new Date(str);
  month = ('0' + (date.getMonth() + 1)).slice(-2);
  day = ('0' + date.getDate()).slice(-2);
  // hours = ("0" + date.getHours()).slice(-2);
  // minutes = ("0" + date.getMinutes()).slice(-2);
  // seconds = ("0" + date.getSeconds()).slice(-2);

  var mySQLDate = [date.getFullYear(), month, day].join('-');
  // var mySQLTime = [hours, minutes, seconds].join(":");
  // return [mySQLDate, mySQLTime].join(" ");
  return [mySQLDate].join(' ');
}
