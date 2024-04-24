import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss'],
})
export class DeleteConfirmDialogComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//

  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public _dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _apiService: ApiService,
    public _dataShare: DataSharingService,
    private _spinner: CustomSpinnerService,
    private _snackBar: SnackBarService
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {


}
delete(){
  console.log(this.data,'deteeee')
  if(this.data.isDelete == 1){
    // console.log("11111");

    this._spinner.open();
    this._apiService
    .deleteCommonHolidays(this.data.common_holiday_id).subscribe({
      next: (res) => {
        this._snackBar.success('Data Deleted Successfully')
        this._dialogRef.close({event:true, data: "true"});
      },
    });
    this._spinner.close();
  }
  else if(this.data.isDelete == 2){
    // console.log("22222");

    this._spinner.open();
    this._apiService
    .deleteCustomHolidays(this.data.custom_holiday_id).subscribe({
      next: (res) => {
        this._snackBar.success('Data Deleted Successfully')
        this._dialogRef.close({event:true, data: "true"});
      },
    });
    this._spinner.close();
  }
  else if(this.data.isDelete == 3){
    // console.log("33333");
    this._spinner.open();
    this._apiService
    .deleteCustomNonOperationalDays(this.data.custom_non_operational_day_id).subscribe({
      next: (res) => {
        this._snackBar.success('Data Deleted Successfully')
        this._dialogRef.close({event:true, data: "true"});
      },
    });
    this._spinner.close();
  }else if(this.data.isDelete == 4) {
    this._spinner.open();
      console.log(this.data,'this.common_non_operational_day_date')
      this._apiService
      .deleteNonOperationalDays(this.data.common_non_operational_day_date).subscribe({
        next:() =>{
          this._spinner.close();
        this._dialogRef.close({event:true, data: "true"});
          this._snackBar.success('Deleted Successfully')
        },error:()=>{
          this._spinner.close();
          this._snackBar.error('Error While Deleting a data');
        }
      })
  }
}
  //* ----------------------------  APIs Methods  --------------------------*//

  //* --------------------------  Public methods  --------------------------*//
  onNoClick(): void {
    this._dialogRef.close();
  }
  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}
