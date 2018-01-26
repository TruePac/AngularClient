import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from './user.model';
import { AlertService } from '../_services/index';
import { SignupService } from './signup.service';

@Component({
    selector: 'signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

    statusCode: number;
    resultString: number;
    requestProcessing = false;
    signUpForm = new FormGroup({
        id: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        passwordConfirm: new FormControl('', Validators.required),
    });

    constructor(private router: Router, private alertService: AlertService, private signupService: SignupService) { }

    ngOnInit() {
    }

    checkPasswords() {
        let password = this.signUpForm.get('password').value.trim();
        let confirm = this.signUpForm.get('passwordConfirm').value.trim();
        if (password != confirm)
            this.alertService.error("Passwords must match");

        if (password.length < 6 || confirm.length < 6)
            this.alertService.error("Password's length must be minimum 6 symbols");

        if (password.length > 20 || confirm.length > 20)
            this.alertService.error("Password's length must be maximum 20 symbols");

    }

    signUp() {
        this.preProcessConfigurations();
        let user = new User (this.signUpForm.get('id').value.trim(), this.signUpForm.get('password').value.trim());
        this.signupService.signUp(user)
            .subscribe(
            data => {
                this.resultString = data;
                console.log(this.resultString);
                if (this.resultString.toString() == "New user was created") {
                    this.alertService.success(this.resultString.toString());
                } else this.alertService.error(this.resultString.toString());
            },
            errorCode => { this.statusCode = errorCode; }
            );
    }

    preProcessConfigurations() {
        this.statusCode = null;
        this.requestProcessing = true;
    }

}
