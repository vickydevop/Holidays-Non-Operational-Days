import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DateTime } from 'luxon';
import { of } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { environment } from 'src/environments/environment';
import { AddEditCustomNonOperationalDaysComponent } from '../dialog/add-edit-custom-non-operational-days/add-edit-custom-non-operational-days.component';
import { DeleteConfirmDialogComponent } from '../dialog/delete-confirm-dialog/delete-confirm-dialog.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-customize-non-operational-days',
  templateUrl: './customize-non-operational-days.component.html',
  styleUrls: ['./customize-non-operational-days.component.scss']
})
export class CustomizeNonOperationalDaysComponent implements OnInit {

  //* -----------------------  Variable Declaration  -----------------------*//

  daysSelected: any[] = [];
  selected_date: any;
  minDate: Date;
  isInserting: boolean = false;
  editbtn: boolean = false;
  deletebtn: boolean = false;
  cancelbtn: boolean = false;
  isDateDisabled: any;
  date:any;
  isDelete: number = 3;
  is_add_custom = true;
  highlightedDates: Date[] = [];
  // minDate:any;

  //* ---------------------------  Constructor  ----------------------------*//

  constructor(private _httpClient: HttpClient,
    private _headerTitle: HeaderTitleService,
    private _apiService: ApiService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _dataSharingService: DataSharingService,
    private _snackBarService: SnackBarService,
    private datepipe: DatePipe,
    private _spinner: CustomSpinnerService,) {
    this.minDate = new Date();
  }

  form = new FormGroup({
    multidate: new FormControl('', Validators.required),

  });


  selected_category_name_val: any = [];
  nestedTreeControl!: NestedTreeControl<TreeData>;
  nestedDataSource!: MatTreeNestedDataSource<TreeData>;

  // sample_data: any = [
  //   {
  //     user_category_id: 5011,
  //     parent_user_category_id: null,
  //     user_category_name: 'SACRED HEART',
  //     is_the_category_hidden: 0,
  //     category_type: 2,
  //     children: [
  //       {
  //         user_category_id: 5012,
  //         parent_user_category_id: '5011',
  //         user_category_name: 'SHIFT 1',
  //         is_the_category_hidden: 0,
  //         category_type: 2,
  //         children: [
  //           {
  //             user_category_id: 5013,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'BCA',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5014,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'BSC',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5015,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'MATHS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5016,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'PHYSICS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5017,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'CS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5018,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'TAMIL',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //         ],
  //       },
  //       {
  //         user_category_id: 5019,
  //         parent_user_category_id: '5011',
  //         user_category_name: 'SHIFT 2',
  //         is_the_category_hidden: 0,
  //         category_type: 2,
  //         children: [
  //           {
  //             user_category_id: 5020,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'BCA',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5021,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'BSC',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5022,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'MATHS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5023,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'PHYSICS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5024,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'CS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5025,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'TAMIL',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },

  //           {
  //             user_category_id: 5026,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'Management',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);

    const index = this.daysSelected.findIndex((x) => x == date);
    if (index < 0) {
      this.daysSelected.push(date);

      this._spinner.open();
      this._apiService.postNonOperationalDays(date).subscribe({
        next:(res)=>{
        this._spinner.close();
        },error:()=>{
        this._spinner.close();
        }
      })
      // .subscribe((res) => {

      //   this._spinner.close();
      // });
    }
    else {
      this.daysSelected.splice(index, 1);
      this._spinner.open();
      this._apiService.deleteNonOperationalDays(date).subscribe({
        next:(res)=>{
        this._spinner.close();
        },error:()=>{
        this._spinner.close();
        }
      })
      // .subscribe((res) => {

      //   this._spinner.close();
      // });

    }
    this.selected_date = this.daysSelected;
    // console.log(this.daysSelected,"kjdjjjddjjdjdjdj");

    calendar.updateTodaysDate();

    let days: any[] = [];
    for (let i = 0; i < this.daysSelected.length; i++) {
      days.push(this.datepipe.transform(this.daysSelected[i], 'dd MMM YYYY'));
      this.form.controls['multidate'].patchValue(`${days}`);
    }
  }
  event: any;
  isSelected: any = (event: any) => {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    return this.daysSelected.find((x) => x == date) ? 'selected' : null;
  };

   // Custom date class function to apply a "highlight" class to specific dates
   dateClass = (date_value: Date): string => {
    // console.log(date_value,'date');
    // console.log(this.highlightedDates,'highlightedDates')
    return this.highlightedDates.some(highlightedDate =>
      this.isSameDate(date_value, highlightedDate)
    ) ? 'highlight' : '';
  };

  // Function to check if two dates are the same
  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  onInsertClick() {
    this.isInserting = true;
    this.AddEditCustom();
  }

  onEditClick() {
    this.isInserting = false;

    this.AddEditCustom();
  }

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  decodedToken:any;
  dateFilter_min:any;
  disabledDates = [new Date()];
  date_values: any;
  ngOnInit(): void {
    this.dateFilter_min = new Date();
    const getToken: any = sessionStorage.getItem('access_token');
    const tokenPayload = getToken.split('.')[1];
    this.decodedToken = JSON.parse(atob(tokenPayload));
    // this.mindate = new Date(new Date());

    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this._apiService.getAllStudentCategories().subscribe({
      next:(res)=>{
      this.nestedDataSource.data = res.data;
      this.nestedTreeControl.dataNodes = res.data;
      this.nestedTreeControl.expandAll();
      },error:()=>{
      this.nestedDataSource.data = [];
      this.nestedTreeControl.dataNodes = [];
      }
    })
    // .subscribe((res) => {
    //   // console.log(res);

    //   this.nestedDataSource.data = res.data;
    //   this.nestedTreeControl.dataNodes = res.data;
    //   this.nestedTreeControl.expandAll();
    // })

    this._apiService.getNonOperationalDays().subscribe({
      next:(res) =>{
        if(res.data.length>0){

          this.date = res.data;
          this.date_values =res.data;
          let days: any[] = [];
          for (let i = 0; i < res.data.length; i++) {
            this.disabledDates.push(new Date(res.data[i].common_non_operational_day_date));
            this.highlightedDates.push(new Date(res.data[i].common_non_operational_day_date));
            days.push(this.datepipe.transform(res.data[i].common_non_operational_day_date, 'dd MMM YYYY'));
          }
         this.form.controls['multidate'].patchValue(`${days}`);
          // let days: any[] = [];
          // for (let i = 0; i < originalDateString.length; i++) {
          //   days.push(this.datepipe.transform(originalDateString[i], 'dd MMM YYYY'));
          //   this.form.controls['multidate'].patchValue(`${days}`);
          // }


        }
      },error:()=>{
        this.date = [];
      }
    })

    // .subscribe((res) => {
    //   this.date = res.data;
    //   // console.log(this.date,"datas");

    // });

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

  check_checkbox(_data:any) {
    console.log(_data);
    if(_data.checked == true) {
      this.getdata();
    }else {
      this.loadData_1();
    }
  }
  //* ----------------------------  APIs Methods  --------------------------*//

  getdata() {
    // console.log('called');
    this._spinner.open();
    this._apiService.getCustomNonOperationalDays(this.selectedcategory).subscribe({
      next:(res) =>{
        this._spinner.close();
        if(res.data.length>0){
        this.dataSource.data = res.data;
      }else{
        this._snackBarService.success('Data not found');
        this.dataSource.data =[];
      }
      },error:() =>{
        this._spinner.close();
        this.dataSource.data =[];
      }
    })
    // .subscribe((res) => {
    //   this.dataSource.data = res.data;


    // });
    // for (let i = 0; i < this.dataSource.data.length; i++) {
    //   this.disabledDates.push(this.dataSource.data[i].common_non_operational_day_date)
    // }


    // this.isDateDisabled = (d: Date):boolean => {
    //   const dateString = DateTime.fromISO(d?.toISOString().slice(0, 10))
    //     .plus({ days: 1 })
    //     .toISODate();
    //   if(this.dataSource!=undefined){
    //     for (let i = 0; i < this.dataSource.data.length; i++) {
    //       if (dateString === this.dataSource.data[i].common_non_operational_day_date || dateString === this.dataSource.data[i].new_custom_non_operational_day_date) {
    //         return false; // Disable the date
    //       }
    //     }
    //   }
    //   return true; // Enable the date
    // };
  }

  loadData_1() {
    this._spinner.open();
    this._apiService.getCustomNonOperationalDays(this.selectedcategory).subscribe({
      next:(res) =>{
        this._spinner.close();
        if(res.data.length>0){
          const current_date = new Date();
          const filteredData = res.data.filter((item: { common_non_operational_day_date: string | number | Date; }) => {
          const holidayDate = new Date(item.common_non_operational_day_date);
          return holidayDate > current_date;
          });
        this.dataSource.data = filteredData;
      }else{
        this._snackBarService.success('Data not found');
        this.dataSource.data =[];
      }
      },error:() =>{
        this._spinner.close();
        this.dataSource.data =[];
      }
    })
  }
  // *---------------------------Tree Structure-------------------------------*//
  private _getChildren = (node: TreeData) => of(node.children);

  hasNestedChild = (_: string, nodeData: TreeData) =>
    nodeData.children.length > 0;

  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data = [];
    this.nestedDataSource.data = data;
  }

  categoryname!: string
  selectedcategory!: string;
  getSelectedCategory(node: any) {
    this.form.get('multidate')?.patchValue(null);
    this.is_add_custom = false;
    // console.log(node);
    this.selectedcategory = node.user_category_id;
    // console.log(this.selectedcategory);

    this._apiService.getCategoryFullName(this.selectedcategory).subscribe({
      next:(res)=>{
        this.categoryname = res.data.student_category_name;
        this.loadData_1();
      },error:()=>{

      }
    })
    // .subscribe((res) => {
    //   // console.log(res.data);
    //   this.categoryname = res.data.student_category_name;
    // })
    // this.getdata();

  }



  // myDateFilter = (date: Date): boolean => {
  //   // console.log(this.disabledDates,'disabledDates');
  //   const disabledDates = this.disabledDates // array of disabled dates
  //   return !disabledDates.some(disabledDate => this.sameDate(date, disabledDate));
  // }

  // sameDate(date1: Date, date2: Date): boolean {
  //   return date1.getDate() === date2.getDate() &&
  //     date1.getMonth() === date2.getMonth() &&
  //     date1.getFullYear() === date2.getFullYear();
  // }


  // *---------------------------Table-------------------------------*//

  displayedColumns: string[] = [
    'Date',
    'CommonCustom',
    'IsCommonNonOperationalDayCancelled',
  ];

  row: any;
  flag!: number
  custom_non_operational_day_id!: number;
  common_non_operational_day_id!: number;
  is_common_non_operational_day_cancelled!: number;
  selectRow(element: any) {
    this.row = element;
    this.flag = element.flag
    this.is_common_non_operational_day_cancelled = element.is_common_non_operational_day_cancelled
    this.custom_non_operational_day_id = element.custom_non_operational_day_id;
    this.common_non_operational_day_id = element.common_non_operational_day_id;
    // console.log(this.row, "row");

    if (this.flag) {
      this.editbtn = false;
      this.deletebtn = false;
      this.cancelbtn = true;
      if (this.is_common_non_operational_day_cancelled == 1) {
        this.cancelbtn = false;
      }
      else {
        this.cancelbtn = true;

      }
    } else {

      this.editbtn = true;
      this.deletebtn = true;
      this.cancelbtn = false;
    }

  }

  delete() {
    this._apiService.deleteCustomNonOperationalDays(this.custom_non_operational_day_id).subscribe({
      next:()=>{
      this.loadData_1();
      this._snackBarService.success('Data Deleted Successfully');
      },error:()=>{
      this._snackBarService.error('Error While Deleting a data');
      }
    })
    // .subscribe((res) => {
    //   this._snackBarService.success('Data Deleted Successfully')
    // });
    // this.getdata();

  }

  postCancelNonOperationalDays() {
    this._spinner.open();
    this._apiService.postCancelNonOperationalDays(this.selectedcategory, this.common_non_operational_day_id).subscribe({
      next:()=>{
        this._spinner.close();
        this.loadData_1();
        this._snackBarService.success('Data Inserted Successfully')
      },error:()=>{
        this._spinner.close();
        this._snackBarService.error('Error while inserting data')
      }
    })
    // .subscribe((res) => {
    // })
    // this._spinner.close();
    // this._snackBarService.success('Data Inserted Successfully')
    // this.getdata();
  }

  //* ------------------------------ Helper Function -----------------------*//

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
    // this.loadData();
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
      // 'display:none;' +
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
      </style>

        <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
        <img style="width:100px;height:100px" src="${customer_logo}"  onerror="this.src='https://getsterapps.getwow.education/assets/icons/logo.png'"  alt="app-logo" />
        <div style=" display: flex;flex-direction: column; width:100%">
        <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">${this.decodedToken.user.customer_sub_domain_name}</span>
          <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase"> Add / Edit Custom and Cancel Common Holidays</span>
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
    const dialogRef = this.dialog.open(AddEditCustomNonOperationalDaysComponent, {
      data: { isInserting: this.isInserting, category: this.selectedcategory, rowvalue: [this.row] },

      disableClose: true,
      width: '400px',
      // minWidth: '400px',
      // minHeight: '500px',


    });    // console.log(this.rowValue);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if (result.data == 1) {
        this.loadData_1();
        this.editbtn = false;
        this.deletebtn = false;
      }

    });
  }

  deletebutton(): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { isDelete: this.isDelete ,  custom_non_operational_day_id : this.custom_non_operational_day_id},
      disableClose: true,
      width: '400px',
      // minWidth: '400px',
      // minHeight: '500px',


    });    // console.log(this.rowValue);

    dialogRef.afterClosed().subscribe((result) => {
      if(result.data){
        this.loadData_1();
        this.editbtn = false;
        this.deletebtn = false;
      }
      // this.btndisable = false;
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
export interface TreeData {
  category_id: string;
  parent_category_id?: string;
  category_name: string;
  ishidden: boolean | string | number;
  children: TreeData[];
  level?: number;
  expandable?: boolean;
}

//! -------------------------------  End  --------------------------------!//

