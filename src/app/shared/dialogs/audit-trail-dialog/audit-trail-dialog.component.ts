import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatRadioButton } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';

import * as XLSX from 'xlsx';
import { ApiService } from '../../services/api/api.service';




@Component({
  selector: 'app-audit-trail-dialog',
  templateUrl: './audit-trail-dialog.component.html',
  styleUrls: ['./audit-trail-dialog.component.scss'],
})
export class AuditTrailDialogComponent implements OnInit {
  auditTrailData: any;
  dataShareData:any;
  constructor(
    private _apiService:ApiService,
    public auditTrailDialogRef: MatDialogRef<AuditTrailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dataSharingService:DataSharingService
  ) {
    this.auditTrailData = data;
  }


  ngOnInit(): void {
    // this._dataSharingService.audit_trail_data.subscribe((data:any)=>{
    //   this.dataShareData=data;
    // })

    this.loadData();
  }

  onNoClick(): void {
    this.auditTrailDialogRef.close(true);
  }


    // onNoClick(): void {
    //   this.MatDialogRef.close();
    // }
    ELEMENT_DATA: PeriodicElement[] = [];
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 20];


    @ViewChild('radio') radio!: MatRadioButton;


    filterValue = '';
    applyFilter(event: Event) {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = this.filterValue;
    }

    displayedColumns: string[] = [
      'entry_by_user_id',
      'entry_type',
      'entry_date_time',
      'app_id',
    ];

    dataSource: MatTableDataSource<PeriodicElement> =
      new MatTableDataSource<PeriodicElement>();
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @ViewChild('paginatorElement', { read: ElementRef })
    paginatorHtmlElement!: ElementRef;

    rowValue: any[] = [];

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

    table_json_data: any;

    loadData() {
      this._apiService
        .getaduittrail(this.currentPage, this.pageSize)
        .subscribe((data) => {
          this.dataSource.data = data.data.postdata;
          // console.log(data.data);

          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = data.data.count[0].count;
          });
        });
      // this._apiService
      //   .get_periodic_elements(this.currentPage, this.pageSize)
      //   .subscribe((res) => {
      //     this.table_json_data = res;
      //     this.dataSource.data = res.data.rows;

      //     setTimeout(() => {
      //       this.paginator.pageIndex = this.currentPage;
      //       this.paginator.length = res.data.count;
      //     });
      //   });
    }

    pageChanged(event: PageEvent) {
      // console.log({ event });
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.loadData();
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
      // console.log(row);
    }
    @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;

    public downloadAsPDF() {
      let pageIndex: number = Number(this.paginator.pageIndex);
      let pageSize: number = Number(this.paginator.pageSize);

      let currentPageEnd = pageSize * (pageIndex + 1);
      let currentPageStart = currentPageEnd - (pageSize - 1);

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
      var printContents = document.getElementById('audit-trail')!.innerHTML;
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
          '</style>' +
          `</head>

          <body onload="window.print()">
            <style>
            .mat-column-select{display:none}
            </style>

            <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
            <img style="width:100px;height:100px" src="assets/getwow.education.png" alt="app-logo" />
            <div style=" display: flex;flex-direction: column; width:100%">
              <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
              <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">Getsteres Audit Trail Details</span>
              <span style="text-align: center;font-size:14px;color:black;font-weight:600;">Records : ( ${currentPageStart} - ${currentPageEnd} of ${
            this.paginator.length
          } ) ${
            this.filterValue.length >= 1
              ? `(Filtered by -" ${this.filterValue} ")`
              : ''
          } (const { DateTime } = require('luxon');
  )</span>
            </div>
            </div>

            ` +
          printContents +
          '</body>' +
          `
            <footer style="position: fixed; bottom: 0; width: 100%;">
            <div style=" display: flex;flex-direction: column; width:100%; align-items:center">
            <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">Jr Plaza Fourth Floor, Tank Street, </span>
            <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">Hosur, Tamil Nadu 635109</span>
            </div>
            </footer>
          ` +
          '</html>'
      );
      popupWin.document.close();
    }


}


export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}
