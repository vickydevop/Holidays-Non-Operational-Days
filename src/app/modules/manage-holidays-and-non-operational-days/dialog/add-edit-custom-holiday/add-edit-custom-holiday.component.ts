import { Component, Inject, OnInit, Optional } from '@angular/core';
import { AddEditCustomizeHolidaysComponent } from '../../add-edit-customize-holidays/add-edit-customize-holidays.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-add-edit-custom-holiday',
  templateUrl: './add-edit-custom-holiday.component.html',
  styleUrls: ['./add-edit-custom-holiday.component.scss']
})
export class AddEditCustomHolidayComponent implements OnInit {

  Holiday!: any;
  getdate!: any;
  date!: any;
  dataSource: any;
  isInserting: boolean = false;
  isEditing: boolean = false;
  isDateDisabled: any;
  disabledDates: any[] = [];

  constructor(public addnew: MatDialogRef<AddEditCustomizeHolidaysComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public _apiService: ApiService,
    public _dateshare: DataSharingService,
    private _spinner: CustomSpinnerService,
     private _snackBarService: SnackBarService,

  ) { }

  form = new FormGroup({
    Holiday: new FormControl('', Validators.required),
    Date: new FormControl('', Validators.required),

  });

  onNoClick(): void {
    this.addnew.close(true);
  }
  min_date:any;
  ngOnInit(): void {
    this.min_date = new Date();
    if(this.data.isInserting != true){
      this.Holiday = this.form.get('Holiday')?.setValue(this.data.rowvalue[0].new_custom_holiday_name);
      this.getdate = this.form.get('Date')?.setValue(this.data.rowvalue[0].new_custom_holiday_date);
      // console.log(this.getdate, "date");

      this.date = convertDatePickerTimeToMySQLTime(this.getdate);
      // console.log(this.date, "d");
    }


    this._apiService.getCustomHolidays(this.data.category).subscribe((res) => {
      this.dataSource = res.data;
      // console.log(this.dataSource, "dialog data");

    })

    this.isDateDisabled = (d: Date):boolean => {
      const dateString = DateTime.fromISO(d?.toISOString().slice(0, 10))
        .plus({ days: 1 })
        .toISODate();
        // console.log(dateString,'dateStringdateStringvvvv')
      if(this.dataSource!=undefined){
        for (let i = 0; i < this.dataSource.length; i++) {
          if (dateString === this.dataSource[i].new_custom_holiday_date || dateString === this.dataSource[i].common_holiday_date) {
            return false; // Disable the date
          }
        }
      }
      return true; // Enable the date
    };

  }

  AddEdit() {
    this.Holiday = this.form.get('Holiday')?.value;
    this.getdate = this.form.get('Date')?.value;
    // console.log(this.getdate, "date");

    this.date = convertDatePickerTimeToMySQLTime(this.getdate);
    // console.log(this.date, "d");

    if (this.data.isInserting == true) {

      this._apiService
        .postCustomHolidays(this.data.category,this.date, this.Holiday).subscribe({
          next: (res) => {
            // this._spinner.close();
            // console.log(res.data);
            this._snackBarService.success('Data Inserted Successfully')

          },
        });
      this.addnew.close({event:true, data: "true"});

    } else {

      this._apiService
      .putCustomHolidays(this.data.rowvalue[0].custom_holiday_id, this.date, this.Holiday).subscribe({
        next: (res) => {
          // this._spinner.close();
          // console.log(res.data);
          this._snackBarService.success('Data Updated Successfully')


          this.addnew.close({event:true,data: res});
        },
      });
      this.addnew.close({event:true, data: "true"});

    }

  }


}

export function convertDatePickerTimeToMySQLTime(str: any) {
  var month, day, year, hours, minutes, seconds;
  var date = new Date(str);
  month = ("0" + (date.getMonth() + 1)).slice(-2);
  day = ("0" + date.getDate()).slice(-2);
  // hours = ("0" + date.getHours()).slice(-2);
  // minutes = ("0" + date.getMinutes()).slice(-2);
  // seconds = ("0" + date.getSeconds()).slice(-2);

  var mySQLDate = [date.getFullYear(), month, day].join("-");
  // var mySQLTime = [hours, minutes, seconds].join(":");
  // return [mySQLDate, mySQLTime].join(" ");
  return [mySQLDate].join(" ");

}
