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
  selector: 'app-add-edit-common-holiday',
  templateUrl: './add-edit-common-holiday.component.html',
  styleUrls: ['./add-edit-common-holiday.component.scss']
})
export class AddEditCommonHolidayComponent implements OnInit {

  Holiday!: any;
  getdate!: any;
  date!: any;
  // dataSource: any;
  isInserting: boolean = false;
  isEditing: boolean = false;
  isDateDisabled: any;
  disabledDates: any[] = [];

  constructor(public addnew: MatDialogRef<AddEditCustomizeHolidaysComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public _apiService: ApiService,
    public _dateshare: DataSharingService,
    private _snackbar:SnackBarService,
    private _spinner: CustomSpinnerService,
  ) { }

  form = new FormGroup({
    Holiday: new FormControl('', Validators.required),
    Date: new FormControl('', Validators.required),

  });

  onNoClick(): void {
    this.addnew.close({event:true,data:this.add_edit});
  }
  date_values:any;
  add_edit:any = 0;
  min_date:any;
  ngOnInit(): void {
    this.min_date = new Date();
    // console.log(this.add_edit,'aaaa');
    // this._apiService.getCommonHolidayscount().subscribe((res) => {
    //   this.dataSource = res.data;
    //   console.log(this.data,this.dataSource, "dialog data");

    // })
    // console.log(this.data,"data");
    if(this.data.isInserting != true){
      this.Holiday = this.form.get('Holiday')?.setValue(this.data.rowvalue[0].common_holiday_name);
      this.getdate = this.form.get('Date')?.setValue(this.data.rowvalue[0].common_holiday_date);
      // console.log(this.getdate, "date");

      this.date = convertDatePickerTimeToMySQLTime(this.getdate);
      // console.log(this.date, "d");
    }

    // for hide dates
    this.date_values = this.data?.table_values;
    // console.log(this.date_values,'this.dataSource');

    this.isDateDisabled = (d: Date):boolean => {
      const dateString = DateTime.fromISO(d?.toISOString().slice(0, 10))
        .plus({ days: 1 })
        .toISODate();
        // console.log(this.date_values);
      if(this.date_values!=undefined){
        for (let i = 0; i < this.date_values.length; i++) {
          // console.log('if',this.date_values[i].common_holiday_date)
          if (dateString === this.date_values[i].common_holiday_date) {
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
        .postCommonHolidays(this.date, this.Holiday).subscribe({
          next: (res) => {
            // this._spinner.close();
            this.add_edit = 1;
            this.addnew.close({event:true, data:this.add_edit});
            this._snackbar.success('Data Inserted Successfully')
          },error:() =>{
            this.add_edit = 0;
          }
        });
    } else {

      this._apiService
        .putCommonHolidays(this.data.rowvalue[0].common_holiday_id, this.date, this.Holiday).subscribe({
          next: (res) => {
            this.add_edit = 1;
            this.addnew.close({event:true, data: this.add_edit});
            this._snackbar.success('Data Updated Successfully')

          },error:()=>{
            this.add_edit = 0;
          }
        });
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

