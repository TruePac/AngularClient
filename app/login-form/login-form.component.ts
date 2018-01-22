import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './user.model'

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
        
    model = new User('', '');;

    constructor(private router: Router) { }

    ngOnInit() {
     
    }

    login() {
        this.router.navigateByUrl("/point_check");
    }
    
    signUp() {
        this.router.navigateByUrl("/signup");
        }
}
