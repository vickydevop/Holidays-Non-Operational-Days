/*
https://docs.nestjs.com/providers#services
*/

// import { Injectable } from '@angular/core';

@Injectable()
export class JwtAuthServiceService {}
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, catchError, delay, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtAuthService {
  return!: string;

  constructor(private route: ActivatedRoute) {
    // sessionStorage.setItem('access_token',
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsImN1c3RvbWVyX2lkIjoxMSwiY291bnRyeV9jb2RlIjoiaW4iLCJjdXN0b21lcl9zdWJfZG9tYWluX25hbWUiOiJ0ZXN0IiwicmVnaXN0ZXJlZF9lZHVjYXRpb25hbF9pbnN0aXR1dGlvbl9uYW1lIjoiVGVzdCBJbnN0aXR1dGlvbiIsInRpbWVfem9uZV9pYW5hX3N0cmluZyI6IkFzaWEvS29sa2F0YSIsInNvY2tldF9pZCI6IiIsImVkdWNhdGlvbmFsX2luc3RpdHV0aW9uX2NhdGVnb3J5X2lkIjoiUkxMNTVTcHdLb0poZ3RILG1jUVVuREgwQmRGSnQ3NCIsInVzZXJfcmVnaXN0ZXJlZF9jYXRlZ29yaWVzX2lkcyI6IjcwTlduUzdDdWF0SGtscCIsInVzZXJfcmVnaXN0cmF0aW9uX2xvZ2luX2FwcHJvdmFsX3N0YXR1cyI6MSwiY291bnRyeSI6IklOIiwicGluX2NvZGUiOiI2MzUxMDkiLCJzdGF0ZV9wcm92aW5jZSI6IlRhbWlsIE5hZHUiLCJjaXR5X2Rpc3RyaWN0X2NvdW50eSI6Ikhvc3VyIiwiYWRkcmVzc19saW5lXzEiOiJrdXJ1bWJhciBzdHJlZXQiLCJhZGRyZXNzX2xpbmVfMiI6ImthbmRoaWt1cHBhbSBwb3N0In0sImlhdCI6MTY4ODIwMjM0OSwiZXhwIjoxNzY4ODIwMjM0OX0.IqR3c1fA-IeZqDnfFkNoQRs4uapVqAn5B0ufCBGnquI'
    //  );
    this.route.queryParams.subscribe(
      (params) => (this.return = params['return'] || '/')
    );
  }

  getJwtToken() {

    let HTTP_OPTIONS = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer '+sessionStorage.getItem('access_token') as any,
      }),
    };

    return HTTP_OPTIONS;
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }
}
