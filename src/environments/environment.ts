// let baseURL:any = 'https://u39api.getwow.education/api/';
let baseURL:any = 'http://localhost:3000/api/';
export const environment = {
  production: false,
 // * ----------------------- ceph -----------------------* //
  ceph_URL: 'https://ceph1.getwow.cloud/',
  // *-------------------  ----------------------------*//
  getCommonHolidayscount:baseURL+'Manage-holidays-non-operational-days/get-common-holidays-count',
  getCommonHolidays:baseURL+'Manage-holidays-non-operational-days/get-common-holidays',
  postCommonHolidays:baseURL+'Manage-holidays-non-operational-days/post-common-holidays',
  putCommonHolidays:baseURL+'Manage-holidays-non-operational-days/put-common-holidays',
  deleteCommonHolidays:baseURL+'Manage-holidays-non-operational-days/delete-common-holidays',
  getAllStudentCategories:baseURL+'Manage-holidays-non-operational-days/2_userapp_user_category/get-all-student-categories-by-customer-id',
  getCategoryFullName:baseURL+'Manage-holidays-non-operational-days/2_userapp_user_category/get-category-full-name-by-user-category-id',

  // *-----------------Custom Holidays-----------------------*//
  getCustomHolidays:baseURL+'Manage-holidays-non-operational-days/get-custom-holidays',
  postCustomHolidays:baseURL+'Manage-holidays-non-operational-days/post-Custom-holidays',
  putCustomHolidays:baseURL+'Manage-holidays-non-operational-days/put-custom-holidays',
  deleteCustomHolidays:baseURL+'Manage-holidays-non-operational-days/delete-custom-holidays',
  postcancelcommonHolidays:baseURL+'Manage-holidays-non-operational-days/post-cancel-common-holidays',


  // *-----------------Common Non-Operational Days-----------------------*//
  getNonOperationalDays:baseURL+'Manage-holidays-non-operational-days/get-non-operational-days',
  postNonOperationalDays:baseURL+'Manage-holidays-non-operational-days/post-non-operational-days',
  deleteNonOperationalDays:baseURL+'Manage-holidays-non-operational-days/delete-non-operational-days',

  // *-----------------Custom Non-Operational Days-----------------------*//

  getCustomNonOperationalDays:baseURL+'Manage-holidays-non-operational-days/get-custom-non-operational-days',
  postCustomNonOperationalDays:baseURL+'Manage-holidays-non-operational-days/post-custom-non-operational-days',
  putCustomNonOperationalDays:baseURL+'Manage-holidays-non-operational-days/put-custom-non-operational-days',
  deleteCustomNonOperationalDays:baseURL+'Manage-holidays-non-operational-days/delete-custom-non-operational-days',
  postCancelNonOperationalDays:baseURL+'Manage-holidays-non-operational-days/post-cancel-non-operational-days',

  check_non_operational_days:baseURL+'Manage-holidays-non-operational-days/check-non-operational-days',
    // *-----------------aduit trial-----------------------*//
  getaduittrail:baseURL+'Manage-holidays-non-operational-days/get-aduit-trail',

};
