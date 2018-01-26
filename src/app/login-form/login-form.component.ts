import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './user.model';
import { AlertService } from '../_services/index';
import { LoginService } from './login.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    model = new User('', '');;
    statusCode: number;
    resultString: number;
    requestProcessing = false;

    constructor(private router: Router, private loginService: LoginService, private alertService: AlertService) { }

    ngOnInit() {

    }

    login() {
        this.preProcessConfigurations();
        let user = new User(this.model.id, this.model.password);
        this.loginService.logIn(user)
            .subscribe(
            data => {
                this.resultString = data;
                if (this.resultString.toString() == "Ok") {
                    this.router.navigateByUrl("/point_check");
                } else this.alertService.error(this.resultString.toString());
            },
            errorCode => { this.statusCode = errorCode; }
            );
    }

    signUp() {
        this.router.navigateByUrl("/signup");
    }

    preProcessConfigurations() {
        this.statusCode = null;
        this.requestProcessing = true;
    }
}
