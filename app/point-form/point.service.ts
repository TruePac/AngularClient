import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {Point} from './point-form.point.interface';

@Injectable()
export class PointService {

  constructor() { }
    
  getPoints(): Observable<Point[]>  {
      
  }

}
