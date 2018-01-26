import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, URLSearchParams, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Point} from './point';

@Injectable()
export class PointService {
    allPointsUrl = "http://localhost:8080/api/findall";
    addPointUrl = "http://localhost:8080/api/add";
    deletePointsUrl = "http://localhost:8080/api/deleteAll";

    constructor(private http: Http) { }
    
    //Get points from server//
    getPoints(): Observable<Point[]> {
        return this.http.get(this.allPointsUrl)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);;
    }
    
    //Add point to server//
    addPoint(point: Point):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.addPointUrl, point, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    
    deleteAll():Observable<number> {
        return this.http.get(this.deletePointsUrl)
            .map(success => success.status)
            .catch(this.handleError);
    }
    

    private extractData(res: Response) {
        return res.json();
    }

    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }

}
