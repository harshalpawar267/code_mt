import { Component, HostListener, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, ModalController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidateForm } from '../../../shared/services/validateForms.service';
import { CommonComponents } from '../../../shared/services/commonComponents.service';
import *  as messages from '../../../shared/constants/messages';
import { AuthService } from '../../../shared/services/auth.service';
import { PUSH_TRANSITION } from '../../../shared/constants/config';

@IonicPage({
  name: 'page-login',
  segment: 'page-login'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ValidateForm, CommonComponents, AuthService]
})

export class LoginPage {
  loginForm: FormGroup;
  public submitted: boolean = false;
  stackCount = 0;
  formErrors = { 'username': '', 'password': '', };
  validationMessages = {
    'username': { 'required': messages.USERNAME_REQUIRED, },
    'password': { 'required': messages.PASSWORD_REQUIRED, },
  };
  @ViewChild(Content) content: Content;
  headerTitle = "Login";

  constructor(protected navCtrl: NavController,
    protected navParams: NavParams,
    protected commonComponents: CommonComponents,
    protected validateForm: ValidateForm,
    protected formBuilder: FormBuilder,
    protected events: Events,
    protected auth: AuthService,
    private modalController: ModalController
  ) {
  }

  ionViewCanEnter() {
    if (this.commonComponents.getPlatform() != 'core') {
      this.commonComponents.hideMenuAndBackBtn("menu", false);
      this.commonComponents.hideMenuAndBackBtn("backBtn", "false");
    }

    if (window.localStorage.getItem('userID') && window.localStorage.getItem('token')) {
      this.auth.authenticated().then(
        res => {
          this.navCtrl.setRoot('page-therapy-list');
        });
      return false;
    }
  }

  ionViewDidLoad(){
    document.addEventListener('keydown',(key)=>{
    })
  }

  
  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required,]],
      password: ['', Validators.required],
    });
  }

  ngDoCheck() {
    this.validateForm.validateFormFields(this.loginForm, this);
  }

  @HostListener('focusout', ['$event'])
  focusEvent(e) {
    this.validateForm.markFieldValidations('blur', e);
  };

  doLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      let username = this.loginForm.controls.username.value;
      let password = this.loginForm.controls.password.value;

      let data = {
        "key": "CORP-123456",
        "device_id": window.localStorage.getItem('deviceID'),
        "data": {
          "email": username,
          "password": password,
        }
      };

      if (this.stackCount >= 1) {
        return false;
      }
      this.stackCount++;

      this.commonComponents.showLoading();
      this.auth.login(data)
        .finally(() => {
          this.commonComponents.hideLoading();
        })
        .subscribe(
        response => {
          if (response.status == 101) {
            window.localStorage.setItem('corporateFirstName', response.data.first_name);
            window.localStorage.setItem('corporateLastName', response.data.last_name);
            window.localStorage.setItem('corporateEmailID', response.data.email);
            window.localStorage.setItem('userID', response.data.user_id);
            window.localStorage.setItem('company_id', response.data.company_id);
            if (window.innerWidth <= 800) {
              this.auth.getSideMenuData();
            }
            this.events.publish('setAuthenticatedFlag', true);
            // this.navCtrl.setRoot('page-therapy-list', {});
            if( response.data.sms_notify_popup == 0){
              this.navCtrl.setRoot('page-home', {'introduction' : 'yes' });
            } else {
              this.navCtrl.setRoot('page-home', {});
            }
            
            // this.auth.getDeclinePopup(data)
            //   .subscribe(response => {
            //     if (response.status == 101) {
            //       if (response.data.display_data.total_amount_pay != 0) {
            //         this.openDeclineModal(response.data);
            //       }
            //     }
            //   })
            //this.events.publish('callDeclineModal', true);

          } else if (response.status == 501) {
            this.stackCount = 0;
            this.events.publish('sideMenuClass', "");
            this.auth.logout();
          } else {
            this.stackCount = 0;
            this.commonComponents.presentToast("error", response.message);
          }
        },
        error => {
          this.stackCount = 0;
          this.events.publish('sideMenuClass', "");
          this.commonComponents.presentToast("error", "Cannot connect to server.");
        },
      );
    }
    else {
      this.validateForm.markFieldValidations('submit', '', this.loginForm);
    }


  }

  @HostListener('keydown', ['$event'])
  enterEvent(e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      this.commonComponents.submitOnLastField(e, document.getElementById('submitButtonLogin'), 2);
    }
  };

  /**
  * Added by : Bhagyashri Nikam.
  * to open forgot password modal
  **/
  modal_stack_count: number = 0;
  openForgotPasswordModal() {
    if (this.modal_stack_count >= 1) {
      return false;
    }
    this.modal_stack_count++;
    //added to prefill email address of forgot passoword.
    let email_address = this.loginForm.controls['username'].value;
    this.commonComponents.showLoading();
    let forgot_password_modal = this.modalController.create('forgotPassword', {
      'email': email_address
    });
    forgot_password_modal.onDidDismiss(data => {
      this.modal_stack_count = 0;
    })
    let root = this;
    forgot_password_modal.present().then(function () {
      root.commonComponents.hideLoading();
    })
  }

  /***************************
  * Added by : Bhagyashri Nikam.
  * purpose: go to sign up
  ******************************/
  goToSignUpPage() {
    this.commonComponents.showLoading();
    let root = this;
    this.navCtrl.setRoot('signUp', {}, PUSH_TRANSITION).then(function () {
      root.commonComponents.hideLoading();
    })
  }

  openDeclineModal(data) { 
    let decline_modal = this.modalController.create('page-decline-modal', { app_data: data }, { showBackdrop: false, enableBackdropDismiss: false });
    decline_modal.present();
    decline_modal.onDidDismiss(data => {
      if (data != undefined && data != null && data != '') {
      }
    });
  }

}
