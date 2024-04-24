import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtAuthService } from './jwtauthservice.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  customer_id: any;
  country_no: any;

  private httpClient: HttpClient;

  constructor(private http: HttpClient, private handler: HttpBackend,
    private _jwtAuthService: JwtAuthService
    ) {
    this.getvalues();
    this.httpClient = new HttpClient(handler);

  }

  getvalues() {
    this.customer_id = sessionStorage.getItem('customer_id');
    this.country_no = sessionStorage.getItem('country_no');
  }

  // post_form(body: any): Observable<any> {
  //   return this.http
  //     .post<any>(
  //       `${environment.form}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
  //       body
  //     )
  //     .pipe(
  //       map((m) => {
  //         let data = m.data;
  //         let msg = m.message;
  //         return [data, msg];
  //       })
  //     );
  // }
  getCommonHolidayscount(){
    return this.http.get<any>(
      `${environment.getCommonHolidayscount}`,
      this._jwtAuthService.getJwtToken()

    )
  }
  getCommonHolidays(page_no:number, per_page:number){
    return this.http.get<any>(
      `${environment.getCommonHolidays}?page_no=${page_no}&per_page=${per_page}`,
      this._jwtAuthService.getJwtToken()

    )
  }
  postCommonHolidays(common_holiday_date:string, common_holiday_name:string){
    return this.http.post<any>(
      `${environment.postCommonHolidays}?common_holiday_date=${common_holiday_date}&common_holiday_name=${common_holiday_name}`,null,
      this._jwtAuthService.getJwtToken()

    )
  }
  putCommonHolidays(common_holiday_id:number, common_holiday_date:string, common_holiday_name:string){
    return this.http.put<any>(
      `${environment.putCommonHolidays}?common_holiday_id=${common_holiday_id}&common_holiday_date=${common_holiday_date}&common_holiday_name=${common_holiday_name}`,null,
      this._jwtAuthService.getJwtToken()

    )
  }
  deleteCommonHolidays(common_holiday_id:number){
    return this.http.delete<any>(
      `${environment.deleteCommonHolidays}?common_holiday_id=${common_holiday_id}`,
      this._jwtAuthService.getJwtToken()

    )
  }

  // *-----------------Categorys-----------------------*//

  getAllStudentCategories(){
    return this.http.get<any>(
      `${environment.getAllStudentCategories}`,
      this._jwtAuthService.getJwtToken()

    )
  }

getCategoryFullName(USER_CATEGORY_ID: string) {
  return this.http.get<any>(
    `${environment.getCategoryFullName}?USER_CATEGORY_ID=${USER_CATEGORY_ID}`,
    this._jwtAuthService.getJwtToken()
  );
}

  // *-----------------Custom Holidays-----------------------*//

  getCustomHolidays(custom_for_user_category_id:string){
    return this.http.get<any>(
      `${environment.getCustomHolidays}?custom_for_user_category_id=${custom_for_user_category_id}`,
      this._jwtAuthService.getJwtToken()

    )
  }

  postCustomHolidays(custom_for_user_category_id:string,new_custom_holiday_date:string, new_custom_holiday_name:string ){
    return this.http.post<any>(
      `${environment.postCustomHolidays}?custom_for_user_category_id=${custom_for_user_category_id}&new_custom_holiday_date=${new_custom_holiday_date}&new_custom_holiday_name=${new_custom_holiday_name}`,null,
      this._jwtAuthService.getJwtToken()

    )
  }
  putCustomHolidays(custom_holiday_id:number, new_custom_holiday_date:string, new_custom_holiday_name:string){
    return this.http.put<any>(
      `${environment.putCustomHolidays}?custom_holiday_id=${custom_holiday_id}&new_custom_holiday_date=${new_custom_holiday_date}&new_custom_holiday_name=${new_custom_holiday_name}`,null,
      this._jwtAuthService.getJwtToken()

    )
  }

  deleteCustomHolidays(custom_holiday_id:number){
    return this.http.delete<any>(
      `${environment.deleteCustomHolidays}?custom_holiday_id=${custom_holiday_id}`,
      this._jwtAuthService.getJwtToken()

    )
  }

  postcancelcommonHolidays(custom_for_user_category_id:string, cancelled_common_holiday_id:number){
    return this.http.post<any>(
      `${environment.postcancelcommonHolidays}?custom_for_user_category_id=${custom_for_user_category_id}&cancelled_common_holiday_id=${cancelled_common_holiday_id}`,null,
      this._jwtAuthService.getJwtToken()

    )
  }

    // *-----------------Common Non-Operational Days-----------------------*//

    getNonOperationalDays(){
      return this.http.get<any>(
        `${environment.getNonOperationalDays}`,
        this._jwtAuthService.getJwtToken()
      )
    }

    postNonOperationalDays(common_non_operational_day_date:string){
      return this.http.post<any>(
        `${environment.postNonOperationalDays}?common_non_operational_day_date=${common_non_operational_day_date}`,null,
        this._jwtAuthService.getJwtToken()

      )
    }

    deleteNonOperationalDays(common_non_operational_day_date:string){
      return this.http.delete<any>(
        `${environment.deleteNonOperationalDays}?common_non_operational_day_date=${common_non_operational_day_date}`,
        this._jwtAuthService.getJwtToken()

      )
    }

    // *-----------------Custom Non-Operational Days-----------------------*//

    getCustomNonOperationalDays(custom_for_user_category_id:string){
      return this.http.get<any>(
        `${environment.getCustomNonOperationalDays}?custom_for_user_category_id=${custom_for_user_category_id}`,
        this._jwtAuthService.getJwtToken()
      )
    }
    postCustomNonOperationalDays(custom_for_user_category_id:string, new_custom_non_operational_day_date:string){
      return this.http.post<any>(
        `${environment.postCustomNonOperationalDays}?custom_for_user_category_id=${custom_for_user_category_id}&new_custom_non_operational_day_date=${new_custom_non_operational_day_date}`,null,
        this._jwtAuthService.getJwtToken()

      )
    }
    putCustomNonOperationalDays(custom_non_operational_day_id:number, new_custom_non_operational_day_date:string){
      return this.http.put<any>(
        `${environment.putCustomNonOperationalDays}?custom_non_operational_day_id=${custom_non_operational_day_id}&new_custom_non_operational_day_date=${new_custom_non_operational_day_date}`,null,
        this._jwtAuthService.getJwtToken()

      )
    }
    deleteCustomNonOperationalDays(custom_non_operational_day_id:number){
      return this.http.delete<any>(
        `${environment.deleteCustomNonOperationalDays}?custom_non_operational_day_id=${custom_non_operational_day_id}`,
        this._jwtAuthService.getJwtToken()

      )
    }

    postCancelNonOperationalDays(custom_for_user_category_id:string, cancelled_common_non_operational_day_id:number){
      return this.http.post<any>(
        `${environment.postCancelNonOperationalDays}?custom_for_user_category_id=${custom_for_user_category_id}&cancelled_common_non_operational_day_id=${cancelled_common_non_operational_day_id}`,null,
        this._jwtAuthService.getJwtToken()

      )
    }

    getaduittrail(page_no:number, per_page:number ) {
      return this.http.get<any>(
        `${environment.getaduittrail}?page_no=${page_no}&per_page=${per_page}`,
        this._jwtAuthService.getJwtToken()
      );
    }

    diabledNonOperationalDays() {
      return this.http.get<any>(
        `${environment.check_non_operational_days}`,
        this._jwtAuthService.getJwtToken()
      );
    }
}
