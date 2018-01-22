import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './user.model'
import { AlertService } from '../_services/index';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
        
  model = new User('', '', '');;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
  }
    
  signUp() {
      if (this.model.password != this.model.passwordConfirm)
      this.alertService.error("Passwords must match");
 
      if (this.model.password.length < 6 || this.model.passwordConfirm.length < 6) 
      this.alertService.error("Password's length must be minimum 6 symbols");
      
      if (this.model.password.length > 20 || this.model.passwordConfirm.length > 20) 
      this.alertService.error("Password's length must be maximum 20 symbols");
      
      }
}
