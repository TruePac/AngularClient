import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, URLSearchParams, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {User} from './user.model';

@Injectable()
export class SignupService {
    signUpUrl = "http://localhost:8080/api/signup"
    
    constructor(private http: Http) { }
    
    signUp(user: User): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.signUpUrl, user, options)
            .map((res: Response) => {
                return res.text();
            })
            .catch(this.handleError);
    }
    
     private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }

}
