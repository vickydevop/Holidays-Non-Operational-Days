//* --------------------------  Start  -----------------------------------*//
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateTime } from 'luxon';
import * as XLSX from 'xlsx';
import { AddEditCustomHolidayComponent } from '../dialog/add-edit-custom-holiday/add-edit-custom-holiday.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of, sample } from 'rxjs';
import { DeleteConfirmDialogComponent } from '../dialog/delete-confirm-dialog/delete-confirm-dialog.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-edit-customize-holidays',
  templateUrl: './add-edit-customize-holidays.component.html',
  styleUrls: ['./add-edit-customize-holidays.component.scss']
})
export class AddEditCustomizeHolidaysComponent implements OnInit {

//* -----------------------  Variable Declaration  -----------------------*//

  isInserting: boolean = false;
  isEditing: boolean = false;
  editbtn:boolean = false;
  deletebtn: boolean = false;
  canclebtn: boolean = false;
  isDelete: number = 2;



//* ---------------------------  Constructor  ----------------------------*//

  constructor(private _httpClient: HttpClient,
    private _headerTitle: HeaderTitleService,
    private _apiService: ApiService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _dataSharingService: DataSharingService,
    private _snackBarService: SnackBarService,
    private _spinner: CustomSpinnerService,) { }

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


//* -------------------------  Lifecycle Hooks  --------------------------*//
  decodedToken:any;
  ngOnInit(): void {
    const getToken: any = sessionStorage.getItem('access_token');
    const tokenPayload = getToken.split('.')[1];
    this.decodedToken = JSON.parse(atob(tokenPayload));
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this._apiService.getAllStudentCategories().subscribe({
      next:(res) => {
        if(res.data.length>0) {
          this.nestedDataSource.data = res.data;
          this.nestedTreeControl.dataNodes = res.data;
          this.nestedTreeControl.expandAll();
        }else{
          this.nestedDataSource.data = [];
          this.nestedTreeControl.dataNodes = [];
          this._snackBarService.success('Data not found')
        }
      // console.log(res);
      }
    })
    // .subscribe((res) => {
    //   // console.log(res);

    //   this.nestedDataSource.data = res.data;
    //   this.nestedTreeControl.dataNodes = res.data;
    //   this.nestedTreeControl.expandAll();
    // })

  }

  check_checkbox(_data:any) {
    console.log(_data);
    if(_data.checked == true) {
      this.getdata();
    }else {
      this.loadData_1();
    }
  }

  loadData_1() {
    this._spinner.open();
    this._apiService.getCustomHolidays(this.selectedcategory).subscribe({
      next:(res) =>{
        if(res.data.length>0){
          this._spinner.close();
          const current_date = new Date();
          const filteredData = res.data.filter((item: { common_holiday_date: string | number | Date; }) => {
          const holidayDate = new Date(item.common_holiday_date);
          return holidayDate > current_date;
          });
          this.dataSource.data = filteredData;
          // console.log(res.data);
        }else{
          this.dataSource.data = [];
          this._spinner.close();
          this._snackBarService.success('Data Not Found')
        }
      },error:()=>{
       this.dataSource.data = [];
          this._spinner.close();
      }
    })
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

//* ----------------------------  APIs Methods  --------------------------*//


  getdata(){
    this._spinner.open();
    this._apiService.getCustomHolidays(this.selectedcategory).subscribe({
      next:(res) =>{
        if(res.data.length>0){
          this._spinner.close();
          this.dataSource.data = res.data;
          // console.log(res.data);
        }else{
          this.dataSource.data = [];
          this._spinner.close();
          this._snackBarService.success('Data Not Found')
        }
      },error:()=>{
       this.dataSource.data = [];
          this._spinner.close();
      }
    })
    // .subscribe((res)=>{
    //   this.dataSource.data = res.data;
    //   this._spinner.close();
    //   console.log(res.data);

    // })
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

  categoryname!:string
  selectedcategory!:string;
  getSelectedCategory(node:any){
    // console.log(node);
    this.is_add_custom = false;
    this.selectedcategory = node.user_category_id;
    // console.log(this.selectedcategory);

    this._apiService.getCategoryFullName(this.selectedcategory).subscribe({
      next:(res)=>{
        this.categoryname = res.data?.student_category_name;
        this.loadData_1();
      }
    })
    // .subscribe((res)=>{
    //   // console.log(res.data.student_category_name);
    //   this.categoryname = res.data.student_category_name
    // })

  }

  delete(){
    this._spinner.open();
    // this._apiService.deleteCustomHolidays(this.custom_holiday_id).subscribe((res)=>{
    // })
    // this._spinner.close();
    // this._snackBarService.success('Data Deleted Successfully')
    // this.getdata();
    this._apiService.deleteCustomHolidays(this.custom_holiday_id).subscribe({
      next:()=>{
        this._spinner.close();
        this._snackBarService.success('Data Deleted Successfully')
        this.loadData_1();
      },error:()=>{
        this._spinner.close();
        this._snackBarService.success('Error While Delete a Data !!!');
      }
    })
    // .subscribe((res)=>{
    // })
    // this._spinner.close();
    // this._snackBarService.success('Data Deleted Successfully')
    // this.getdata();

  }

  cancelcommonHolidays(){
    this._spinner.open();
    this._apiService.postcancelcommonHolidays(this.selectedcategory,this.common_holiday_id).subscribe({
      next:()=>{
      this._spinner.close();
      this.loadData_1();
      this.canclebtn = false;
      this._snackBarService.success('common holiday cancelled successfully');
      },error:()=>{
        this._spinner.close();
        this._snackBarService.success('Error While cancelling a holiday !!!')
      }
    })
    // .subscribe((res)=>{
    //   this.getdata();
    // })
    // this.canclebtn = false;
    // this._spinner.close();
    // this._snackBarService.success('Data Inserted Successfully')
  }

  // *---------------------------Table-------------------------------*//

  displayedColumns: string[] = [
    'Date',
    'CustomHolidayName',
    'CommonHolidayName',
    'Iscommonholidaycancelled'
  ];

  custom_holiday_id:any;
  common_holiday_id!:number
  is_common_holiday_cancelled!:number;
  is_add_custom:boolean = true;
    // select row from table
  row: any
  selectRow(element: any) {
    this.row = element;
    this.custom_holiday_id =element.custom_holiday_id;
    this.common_holiday_id = element.common_holiday_id;
    this.is_common_holiday_cancelled = element.is_common_holiday_cancelled;
    // console.log(this.row, "row");
    if(this.custom_holiday_id){
      this.editbtn = true;
      this.deletebtn = true;
      this.canclebtn = false;
    }
    else{
      this.editbtn = false;
      this.deletebtn = false;
      this.canclebtn = true;
      if(this.is_common_holiday_cancelled == 1){
        this.canclebtn = false;
      }
      else{
        this.canclebtn = true;

      }
    }


  }


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
      '.mat-radio-container {' +
      '   display: none' +
      '}' +
      '</style>' +
      `</head>

      <body onload="window.print()">
      <style>

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
          <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">Add / Edit Custom and Cancel Common Holidays</span>
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
    const dialogRef = this.dialog.open(AddEditCustomHolidayComponent, {
      data:{isInserting: this.isInserting, category: this.selectedcategory, rowvalue: [this.row]},
      disableClose: true,
      width: '400px',
      // minWidth: '400px',
      // minHeight: '500px',


    });    // console.log(this.rowValue);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);

      if(result.data){
        this.loadData_1();
      }
      this.editbtn = false;
      this.deletebtn = false;
    });
  }

  deletebutton(): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { isDelete: this.isDelete ,  custom_holiday_id : this.custom_holiday_id},
      disableClose: true,
      width: '400px',
      // minWidth: '400px',
      // minHeight: '500px',


    });    // console.log(this.rowValue);

    dialogRef.afterClosed().subscribe((result) => {
      if(result.data){
        this.loadData_1();
      }
      this.editbtn = false;
      this.deletebtn = false;
    });
  }
}
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

