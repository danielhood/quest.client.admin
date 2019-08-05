import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

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

  buildTokenRequestOptions(): object {
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
      responseType: "text"
    };
  }

  getAuthToken(user: string, pass: string): Observable<TokenModel> {
    return this.http.post<TokenModel>('https://quest.local:8443/token', this.buildTokenRequestBody('admin', 'admin'), this.buildTokenRequestOptions())
      .pipe( map (
        res => {
            this.storeToken(res.token);
            console.log(localStorage.getItem('token'), res);
            return res;
        }
        ));
  } 
    
    storeToken(token: string) {
        localStorage.setItem('token', token);
    }
}
