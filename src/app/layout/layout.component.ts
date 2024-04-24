import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginDialogComponent } from '../shared/dialogs/login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private jwtService: JwtHelperService,private router:Router,private dialog: MatDialog) { }
  headerPosition: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.headerPosition = true;
    } else {
      this.headerPosition = false;
    }
  }




  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    setTimeout(() => {
      let user_registration_login_approval_status =
        this.jwtService.decodeToken(
          sessionStorage.getItem('access_token') as string
        ).user.user_registration_login_approval_status;

      const val = user_registration_login_approval_status;
      if (val == 3) {
        this.router.navigateByUrl('login-access-approval');
      } else {
        this.checkLoginAccess();
      }
    }, 800);
  }

  checkLoginAccess() {
    const dialogRef = this.dialog
      .open(LoginDialogComponent, {
        disableClose: true,
        width: '450px',
        // height: '591px',
      })
      .afterClosed()
      .subscribe((res) => {
        window.parent.postMessage(
          JSON.stringify({ is_redirect_to_apps_landing_page: true }),
          // globalShareBaseOrigin
        );
      });
  }
}
