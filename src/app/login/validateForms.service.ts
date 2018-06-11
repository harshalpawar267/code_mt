import { Injectable } from '@angular/core';

@Injectable()
export class ValidateForm {

    constructor() { }
    validateFormFields(injectedForm, obj) {

        if (!injectedForm) { return; }
        const form = injectedForm;
        for (const field in obj.formErrors) {
            obj.formErrors[field] = '';
            const control = form.get(field);
            if ((control && control.touched && !control.valid) || (control && obj.submitted)) {
                control.markAsTouched(true);
                const messages = obj.validationMessages[field];
                for (const key in control.errors) {
                    obj.formErrors[field] = messages[key];
                }
            }
        }
    }

    touchSelect(control) {
        control.markAsTouched();
    }

    markFieldValidations(event, field?, form?, fieldArr?) {
        switch (event) {
            case 'blur':
                let elem = field.srcElement || field.target;
                if (elem) {
                    let iTemp = 0;
                    let elemtDom = elem;
                    while (elemtDom && iTemp++ < 5) {
                        if (elemtDom.tagName == "ION-ITEM") {
                            elemtDom.classList.remove('ng-untouched');
                            elemtDom.classList.add('ng-touched');
                            break;
                        }
                        elemtDom = elemtDom.parentElement;
                    }
                }
                break;
            case 'submit':
                this.validateAllFieldAndFocus(form, fieldArr);
                break;
            case 'reset':
                for (var i = 0; i < document.querySelectorAll('ion-item').length; i++) {
                    document.querySelectorAll('ion-item')[i].classList.remove('ng-touched');
                    document.querySelectorAll('ion-item')[i].classList.add('ng-untouched');
                }
                break;
        }
    }

    validateAllFieldAndFocus(formName, fieldArray = []) {
        let focusItem = "";

        Object.keys(formName.controls).forEach(key => {
            let flag = true;
            if (fieldArray.length > 0) {
                if (fieldArray.indexOf(key) == -1) {
                    flag = false;
                }
            }
            if (flag) {
                let elementDom = document.querySelector('ion-input[formControlName="' + key + '"]');
                let elementDomParent;
                let i = 0;
                while (1 && elementDom && i < 5) {
                    if (elementDom.tagName == 'ION-ITEM') {
                        elementDomParent = elementDom; break;
                    } else {
                        elementDom = elementDom.parentElement;
                    }
                    i++;
                }

                if (elementDomParent) {
                    if (elementDomParent.tagName == 'ION-ITEM') {
                        elementDomParent.classList.add('ng-touched');
                        elementDomParent.classList.remove('ng-untouched');
                    }
                    if (formName.controls[key].valid == true) {

                        elementDomParent.classList.remove('ng-invalid');
                    } else {

                        elementDomParent.classList.add('ng-invalid');
                    }
                }
                if (formName.controls[key].valid != true && focusItem == "") {
                    focusItem = key;
                }
            }


            if (focusItem != "") {
                var elementDom = document.querySelector('[formControlName="' + focusItem + '"]');
                elementDom.parentElement.parentElement.parentElement.scrollIntoView(true);
            }

        });
    }

    /**
     * Function used for Template Driven Forms Dynamic validation
     * Nitin Pund
     * Date 14 Nov 2017
     * @parameters
     *  1 :  Injectedform is a form object
     *  2 : obj is current instance (this)
     *  3 : fields => fields to be validated, only these fields will get validated
     */

    validateTemplateFormFields(Injectedform, obj, field_arr) {
        if (!field_arr) { return; }
        for (const field in obj.formErrors) {
            obj.formErrors[field] = '';
            const control = Injectedform.controls[field];
            if ((control && control.touched && !control.valid) || (control && obj.submitted)) {
                control.markAsTouched();
                const messages = obj.validationMessages[field];
                for (const key in control.errors) {
                    obj.formErrors[field] = messages[key];
                }

                //--------------

                let elementDom = document.querySelector('ion-input[name="' + field + '"]') || document.querySelector('ion-list[name="' + field + '"]');

                let elementDomParent;
                let i = 0;
                while (1 && elementDom && i < 5) {
                    if (elementDom.tagName == 'ION-ITEM' || elementDom.tagName == "ION-LIST") {
                        elementDomParent = elementDom; break;
                    } else {
                        elementDom = elementDom.parentElement;
                    }
                    i++;
                }

                if (elementDomParent) {
                    if (elementDomParent.tagName == 'ION-ITEM' || elementDom.tagName == "ION-LIST") {
                        elementDomParent.classList.add('ng-touched');
                        elementDomParent.classList.remove('ng-untouched');
                    }
                    if (Injectedform.controls[field].valid == true) {

                        elementDomParent.classList.remove('ng-invalid');
                    } else {

                        elementDomParent.classList.add('ng-invalid');
                    }
                }
            }
        }
    }
}




