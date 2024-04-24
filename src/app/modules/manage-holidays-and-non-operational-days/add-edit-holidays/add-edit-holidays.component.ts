//* --------------------------  Start  -----------------------------------*//

import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { AddEditCommonHolidayComponent } from '../dialog/add-edit-common-holiday/add-edit-common-holiday.component';
import { DeleteConfirmDialogComponent } from '../dialog/delete-confirm-dialog/delete-confirm-dialog.component';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-add-edit-holidays',
  templateUrl: './add-edit-holidays.component.html',
  styleUrls: ['./add-edit-holidays.component.scss']
})
export class AddEditHolidaysComponent implements OnInit {

//* -----------------------  Variable Declaration  -----------------------*//

  isInserting: boolean = false;
  isEditing: boolean = false;
  common_holiday_id!: number;
  common_holiday_date!:string;
  btndisable: boolean = false;
  deletebtn: boolean = false;
  currentdate:any;
  isDelete: number = 1;
  check_rad_btn:boolean = false;

//* ---------------------------  Constructor  ----------------------------*//

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public dialog: MatDialog,
    public _apiService: ApiService,
    public _dataShare: DataSharingService,
    private _spinner: CustomSpinnerService,
    private _snackBarService: SnackBarService
  ) { }

//* -------------------------  Lifecycle Hooks  --------------------------*//

  decodedToken:any;
  current_date:any;
  ngOnInit(): void {
    const getToken: any = sessionStorage.getItem('access_token');
      const tokenPayload = getToken.split('.')[1];
      this.decodedToken = JSON.parse(atob(tokenPayload));
      this.current_date = new Date();
  this.loadData_1();
  }
  table_values:any;
  loadData(){
    this._spinner.open();
    this._apiService
      .getCommonHolidays(this.currentPage, this.pageSize).subscribe({
        next: (res) => {
          // console.log(res.data.length,res.data,res.data.length>0)
          this._spinner.close();
          if( res.data.count[0].count>0) {
            this.table_values = res.data?.all_values;
            this.dataSource.data = res.data.getdata;
          }else{
            this._snackBarService.success('Data Not Found')
          }
          // this._spinner.close();
          // console.log(this.dataSource.data);

          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = res.data.count[0].count;
          });

        },error:() =>{
          this.table_values = [];
          this.dataSource.data = [];
          this._spinner.close();
          // this._snackBarService.success('Data not found');
        }
      });
}

check_checkbox(_data:any) {
  console.log(_data);
  if(_data.checked == true) {
    this.loadData();
  }else {
    this.loadData_1();
  }
}

loadData_1() {
  this._spinner.open();
  this._apiService
    .getCommonHolidays(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        // console.log(res.data.length,res.data,res.data.length>0)
        this._spinner.close();
        if( res.data.count[0].count>0) {
          const current_date = new Date();
          const filteredData = res.data.getdata.filter((item: { common_holiday_date: string | number | Date; }) => {
          const holidayDate = new Date(item.common_holiday_date);
          return holidayDate > current_date;
          });
          this.table_values = res.data?.all_values;
          this.dataSource.data = filteredData;
        }else{
          this._snackBarService.success('Data Not Found')
        }
        // this._spinner.close();
        // console.log(this.dataSource.data);

        // setTimeout(() => {
        //   this.paginator.pageIndex = this.currentPage;
        //   this.paginator.length = res.data.count[0].count;
        // });

      },error:() =>{
        this.table_values = [];
        this.dataSource.data = [];
        this._spinner.close();
        // this._snackBarService.success('Data not found');
      }
    });
}
  onInsertClick() {
    this.isInserting = true;
    this.AddEditCustom();
  }

  onEditClick() {
    this.isEditing = true;
    this.isInserting = false;

    this.AddEditCustom();

    // this.dataToEdit = data;
  }

  // select row from table
  row: any
  selectRow(element: any) {
    // console.log(element,'element')
    this.common_holiday_date = "";
    this.row = element;
    this.common_holiday_id = element.common_holiday_id;
    this.common_holiday_date = element.common_holiday_date;

    // console.log(this.row, "row");
    this.btndisable = true;

    this.currentdate = DateTime.local().toFormat('yyyy-MM-dd');
    if(this.currentdate < this.common_holiday_date){
      this.deletebtn = true;
    }else{
      this.deletebtn=false;
    }


  }

//* ----------------------------  APIs Methods  --------------------------*//

  delete(){
    this._spinner.open();
    this._apiService
    .deleteCommonHolidays(this.common_holiday_id).subscribe({
      next:() =>{
        this._spinner.close();
        this.loadData_1();
        this._snackBarService.success('Deleted Successfully')
      },error:()=>{
        this._spinner.close();
        this.loadData_1();
        this._snackBarService.error('Error While Deleting a data');
      }
    })
    // .subscribe({
    //   next: (res) => {
    //     this.ngOnInit();
    //   },
    // });
    // this._spinner.close();
  }

  displayedColumns: string[] = [
    'Date',
    'HolidayName',
  ];

  dataSource: MatTableDataSource<any> =
    new MatTableDataSource<any>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];


  rowValue: any[] = [];
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // console.log(this.selection.selected);
    this.rowValue = this.selection.selected;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }



  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  ngDoCheck(): void {
    if (this.selection.selected.length <= 0) {
      this.rowValue = [];
    }
  }
  pageChanged(event: PageEvent) {
    // console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData_1();
  }
  showPageSizeOptions: boolean = true;

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'First';
    paginator._intl.itemsPerPageLabel = 'Records Per Page';
    paginator._intl.lastPageLabel = 'Last';
    paginator._intl.nextPageLabel = 'Next';
    paginator._intl.previousPageLabel = 'Previous';
  }
  exportReport(fileName: any): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  onPrint() {
    window.print();
  }

  onRowClicked(row: any) {
  }
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;

  public downloadAsPDF() {
    let pageIndex: number = Number(this.paginator.pageIndex);
    let pageSize: number = Number(this.paginator.pageSize);

    let currentPageEnd = pageSize * (pageIndex + 1);
    let currentPageStart = currentPageEnd - (pageSize - 1);
    let {
      registered_educational_institution_name,
      city_district_county,
      state_province,
      pin_code,
      address_line_1,
      address_line_2,
      user_id,
      customer_id,
      country_code,
      customer_sub_domain_name
    } = this.decodedToken.user;
    let customer_logo = `${environment.ceph_URL}${country_code}-${customer_id}/${customer_sub_domain_name}-icon-144x144.png`;

    const htmlToPrint =
      '' +
      '<style type="text/css">' +
      '.pageFooter {' +
      '    display: table-footer-group;' +
      '    counter-increment: page;' +
      '}' +
      '.pageFooter:after {' +
      '   content: "Page " counter(page)' +
      '}' +
      '</style>';
    var printContents = document.getElementById('pdfTable')!.innerHTML;
    let popupWin: any = window.open(
      'Angular Large Table to pdf',
      '_blank',
      'width=768,height=auto'
    );

    popupWin.document.write(
      '<html><head>' +
      '<link rel="stylesheet" href="' +
      'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
      '<style type="text/css">' +
      '.pageFooter {' +
      '    display: table-footer-group;' +
      '    counter-increment: page;' +
      '}' +
      '.pageFooter:after {' +
      '   content: "Page Number" counter(page)' +
      '}' +
      '.mat-table {' +
      ' width: 80% ' +
      '}' +
      '.mat-radio-button {' +
      // 'visibility:hidden;' +
      '}' +
      '.mat-radio-container {' +
        '   display: none' +
        '}' +
      '</style>' +
      `</head>

      <body onload="window.print()">
      <style>
      input[type=checkbox]{
                  display:none
                 }
                .mat-column-details,th,td,img{
                  height: 50px;
                  width: 50px;
                  padding-left:10px;
                }
      .mat-column-select{display:none}
      </style>

        <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
        <img style="width:100px;height:100px" src="${customer_logo}"  onerror="this.src='https://getsterapps.getwow.education/assets/icons/logo.png'"  alt="app-logo" />
        <div style=" display: flex;flex-direction: column; width:100%">
        <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">${this.decodedToken.user.customer_sub_domain_name}</span>
          <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase"> List of Common Holidays for your educational Institution</span>
          <span style="text-align: center;font-size:14px;color:black;font-weight:600;">Records : ( ${currentPageStart} - ${currentPageEnd} of ${this.paginator.length
      } ) ${this.filterValue.length >= 1
        ? `(Filtered by -" ${this.filterValue} ")`
        : ''
      } (${DateTime.local().toFormat('yyyy-MM-dd TT')})</span>
        </div>
        </div>

        ` +
      printContents +
      '</body>' +
      `
        <footer style="position: fixed; bottom: 0; width: 100%;">
        <div style=" display: flex;flex-direction: column; width:100%; align-items:center">
        <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${this.decodedToken?.user?.address_line_1}, ${this.decodedToken?.user?.address_line_2},</span>
        <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${this.decodedToken?.user?.city_district_county}, ${this.decodedToken?.user?.state_province} ${this.decodedToken?.user?.pin_code}</span>
          </div>
        </footer>
      ` +
      '</html>'
    );
    popupWin.document.close();
  }
  AddEditCustom(): void {
    const dialogRef = this.dialog.open(AddEditCommonHolidayComponent, {
      data: { isInserting: this.isInserting ,  rowvalue : [this.row],table_values: this.table_values},
      disableClose: true,
      width: '400px',
      // minWidth: '400px',
      // minHeight: '500px',


    });    // console.log(this.rowValue);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result,'res loadData')
      if(result.data == 1){
        this.loadData_1();
        this.check_rad_btn = false;
        this.btndisable = false;
        this.deletebtn = false;
      }
    });
  }

  deletebutton(): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { isDelete: this.isDelete ,  common_holiday_id : this.common_holiday_id},
      disableClose: true,
      width: '400px',
      // minWidth: '400px',
      // minHeight: '500px',


    });    // console.log(this.rowValue);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('delete',result)
      if(result.data){
        this.ngOnInit();
      }
      this.check_rad_btn = false;
      this.btndisable = false;
      this.deletebtn = false;
    });
  }

}
//* --------------------------  Public methods  --------------------------*//

export interface PeriodicElement {
  name: string;
  // WOWFlashCardsName: string;
  // RelevantSyllabusCategories: string;
  // IsthisfromGlobal: string;
  // PopularityNoofUsers: number;
  // one_time_subscription_cost_per_user_for_global_users:string;
  // globalized_datetime:any
}

//! -------------------------------  End  --------------------------------!//
