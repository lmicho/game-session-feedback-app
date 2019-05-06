import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators'
import { ApiService } from '../../../shared/services/api.service';
@Injectable({
  providedIn: 'root'
})
export class SessionResolver implements Resolve<any> {
  constructor(
    private _apiService: ApiService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    const sessionId = route.params['id'];
    const url = '/feedbacks/session/' + sessionId;
    return this._apiService.get(url).pipe(catchError(error => {
      return EMPTY
    }), mergeMap(something => {
      if (something) {
        return of(something)
      } else {
        return EMPTY;
      }
    })
    )
  }
}