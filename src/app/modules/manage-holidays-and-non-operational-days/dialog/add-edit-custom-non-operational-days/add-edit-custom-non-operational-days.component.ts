import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { AddEditCustomizeHolidaysComponent } from '../../add-edit-customize-holidays/add-edit-customize-holidays.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';


@Component({
  selector: 'app-add-edit-custom-non-operational-days',
  templateUrl: './add-edit-custom-non-operational-days.component.html',
  styleUrls: ['./add-edit-custom-non-operational-days.component.scss']
})
export class AddEditCustomNonOperationalDaysComponent implements OnInit {

  Holiday!: any;
  getdate!: any;
  date!: any;
  dataSource: any;
  isInserting: boolean = false;
  isEditing: boolean = false;
  isDateDisabled: any;
  disabledDates: any[] = [];

  constructor(public addnew: MatDialogRef<AddEditCustomNonOperationalDaysComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public _apiService: ApiService,
    public _dateshare: DataSharingService,
    private _spinner: CustomSpinnerService,
    private _snackBarService: SnackBarService,
  ) { }
  form = new FormGroup({
    // Holiday: new FormControl('', Validators.required),
    Date: new FormControl('', Validators.required),

  });
  check_status:any =0;
  min_date:any;
  ngOnInit(): void {
    this.min_date = new Date();
    // console.log(this.data);

    if (this.data.isInserting != true) {
      // this.Holiday = this.form.get('Holiday')?.setValue(this.data.rowvalue[0].new_custom_holiday_name);
      this.getdate = this.form.get('Date')?.setValue(this.data.rowvalue[0].new_custom_non_operational_day_date);
      // console.log(this.getdate, "date");

      // this.date = convertDatePickerTimeToMySQLTime(this.getdate);
      // console.log(this.date, "d");
    }


    this._apiService.getCustomNonOperationalDays(this.data.category).subscribe({
      next:(res)=>{
      this.dataSource = res.data;
      },error:()=>{
      this.dataSource = [];
      }
    })
    // .subscribe((res) => {
    //   this.dataSource = res.data;
    //   // console.log(this.dataSource, "dialog data");

    // })

    this.isDateDisabled = (d: Date): boolean => {
      const dateString = DateTime.fromISO(d?.toISOString().slice(0, 10))
        .plus({ days: 1 })
        .toISODate();
      if (this.dataSource != undefined) {
        // console.log("date disable", this.dataSource);

        for (let i = 0; i < this.dataSource.length; i++) {
          if (dateString === this.dataSource[i].new_custom_non_operational_day_date || dateString === this.dataSource[i].common_non_operational_day_date) {
            return false; // Disable the date
          }
        }
      }
      return true; // Enable the date
    };

  }

  AddEdit() {
    if (this.data.isInserting == true) {
      // this.Holiday = this.form.get('Holiday')?.value;
      this.getdate = this.form.get('Date')?.value;
      // console.log(this.getdate, "date");

      this.date = convertDatePickerTimeToMySQLTime(this.getdate);
      // console.log(this.date, "d");

      this._apiService
        .postCustomNonOperationalDays(this.data.category, this.date).subscribe({
          next: (res) => {
            this.check_status = 1;
            // this._spinner.close();
            // console.log(res.data);
            this.addnew.close({event:true, data: this.check_status});
            this._snackBarService.success('Data Inserted Successfully');
          },error:()=>{
            this.check_status = 0;
            this._snackBarService.error('Error While Inserting Data');
          }
        });

    } else {
      console.log(this.getdate, "date");
      this.getdate = this.form.get('Date')?.value;
      this.date = convertDatePickerTimeToMySQLTime(this.getdate);

      console.log(this.date,this.getdate,this.data.rowvalue[0].custom_non_operational_day_id)
      this._apiService
        .putCustomNonOperationalDays(this.data.rowvalue[0].custom_non_operational_day_id, this.date).subscribe({
          next: (res) => {
            this.check_status = 1;
            // this._spinner.close();
            // console.log(res.data);
            this.addnew.close({event:true, data:this.check_status});
            this._snackBarService.success('Data Updated Successfully');
          },error:()=>{
            this.check_status = 0;
            this._snackBarService.error('Error While Updating');
          }
        });


    }

  }
  onNoClick(): void {
    this.addnew.close({event:true, data:this.check_status});
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
