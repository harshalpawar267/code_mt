import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operator/map';
import { SERVER_URL } from '../../shared/constants/config';
import { AuthService } from '../../shared/services/auth.service';
/*
  Generated class for the ShopProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopProvider {

  constructor(public http: Http, protected auth: AuthService) {
  }

  wellnessCredit() {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_wellness_credit', this.auth.getFormatedRequest())
      .map(resp => resp.json()).catch(this.auth.handleError);
  }

  getCcDetails(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_cc_details', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  purchessFromCreditcard(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_payment_details', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  seriesInfo() {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_series', this.auth.getFormatedRequest())
      .map(resp => resp.json()).catch(this.auth.handleError);
  }

  credithistory(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=wellness_history', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  seriesHistory() {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_series_details', this.auth.getFormatedRequest())
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  check_special_for_series(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=check_special_for_series', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  applyed_special_code_check_series(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=applyed_special_code_check_series', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }


  /********************************Administration**************************************/
  getwaiverdocument(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_waiver_documents', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  waiverdocumentpdfdownload(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=waiver_document_pdf_download', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  getprogramdocument(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_program_schedules', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  getprogramscheduledetails(data) {
    return this.http.post(SERVER_URL + 'upcoming_appointment_api.php?method=get_view_appointments', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  getinvoicelist(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_invoice_list', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  getinvoicedetails(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_invoice_details_non_guest', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  payInvoiceCreditcard(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_payment_details', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  getinvoicedetailsGuest(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_invoice_details', this.auth.getFormatedRequest(data))
      .map(resp => resp.json()).catch(this.auth.handleError);
  }


  purchessFromCreditcardGuestUser(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_payment_details_guest_user', this.auth.getFormatedRequest(data))
      .map(resp => resp.json()).catch(this.auth.handleError);
  }

  updateNewCC(data) {
    return this.http.post(SERVER_URL + 'general_data_api.php?method=edit_credit_card', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }
  /********************************Administration**************************************/
  /********************************refer friend**************************************/
  referFriend(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=refer_friend', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }
  /********************************refer friend**************************************/
  /********************************favorite invitation**************************************/
  favorite_invitation() {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=favorite_invitation', this.auth.getFormatedRequest())
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  favoriteInvitationResponce(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=favorite_invitation_responce', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }
  /********************************favorite invitation**************************************/
  /********************************report**************************************/
  reportResponce(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=company_report', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).catch(this.auth.handleError);
  }
  searchDataResponce(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=search_company_data', this.auth.getFormatedRequest(data))
      .map(resp =>this.auth.processResponse(resp)).catch(this.auth.handleError);
  }

  getScheduleDetails(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=get_schedule_data', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).toPromise().catch(this.auth.handleError);
  }

  exportScheduleDetails(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=export_schedule_data', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).toPromise().catch(this.auth.handleError);
  }

  deleteFile(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=delete_file', this.auth.getFormatedRequest(data))
      .map(resp => resp.json()).catch(this.auth.handleError);
  }

  exportAptdataDetails(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=export_apt_data', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).toPromise().catch(this.auth.handleError);
  }
 
  exportNewCustDetails(data) {
    return this.http.post(SERVER_URL + 'profile_history_api.php?method=export_new_customer_data', this.auth.getFormatedRequest(data))
      .map(resp => this.auth.processResponse(resp)).toPromise().catch(this.auth.handleError);
  }


  /********************************report**************************************/

}
