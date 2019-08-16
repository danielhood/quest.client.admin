import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {TokenModel} from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;

  constructor(private http: HttpClient) { }

  buildTokenRequestBody(user: string, pass: string): object {
    return {
      username: user,
      password: pass
    }
  }

  buildDeviceTokenRequestBody(hostname: string): object {
    return {
      hostname: hostname,
      devicekey: 'testdevicekey'
    }
  }

  buildTokenRequestOptions(): object {
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getAuthToken(user: string, pass: string): Observable<TokenModel> {
    console.log('Geting auth token...');
    return this.http.post<TokenModel>('https://quest.local:8443/token', 
      this.buildTokenRequestBody(user, pass), 
      this.buildTokenRequestOptions());
  } 
    


  getDeviceToken(hostname: string): Observable<TokenModel> {
    console.log('Geting device token...');
    return this.http.post<TokenModel>('https://quest.local:8443/token', 
      this.buildDeviceTokenRequestBody(hostname), 
      this.buildTokenRequestOptions());
  } 
    storeToken(token: string) {
        localStorage.setItem('token', token);
    }
}
