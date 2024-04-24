import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiPrefixInterceptor } from './core/config/api-prefix.interceptor';
import { StyleManager } from './shared/services/style-manager/style-manager.service';
import { SharedModule } from './shared/shared.module';
import { JwtAuthServiceService } from './shared/services/api/jwtauthservice.service';
import { AuditTrailDialogComponent } from './shared/dialogs/audit-trail-dialog/audit-trail-dialog.component';
import { DatePipe } from '@angular/common';
// export function tokenGetter() {
//   return sessionStorage.getItem('access_token');
// }
@NgModule({
  declarations: [AppComponent,AuditTrailDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],  providers: [
    DatePipe,
    JwtAuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    StyleManager,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}
