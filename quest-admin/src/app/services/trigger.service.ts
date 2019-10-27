import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PlayerModel } from '../models/player.model';
import { DeviceModel } from '../models/device.model';
import { TriggerModel } from '../models/trigger.model';

@Injectable({
    providedIn: 'root',
  })
export class TriggerService {

  constructor(private http: HttpClient) { }

  buildTriggerRequestOptions(): object {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('device-token'),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
      responseType: "text",
    };
  }

  buildTriggerRequestBody(playerCode: number, deviceType: string): object {
    return {
      playercode: playerCode,
      deviceType: deviceType
    }
  }

  buildGetLastCodeRequestOptions(): object {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      })
    };
  }

  trigger(playerCode: number, deviceType: string): Observable<string> {
    return this.http.post<string>('https://quest.local:8443/trigger', this.buildTriggerRequestBody(playerCode, deviceType), this.buildTriggerRequestOptions())
        .pipe( tap (
          data => console.log('trigger', data)
        )
      );
  }

  getLastCode(): Observable<TriggerModel> {
    return this.http.get<TriggerModel>('https://quest.local:8443/trigger', this.buildGetLastCodeRequestOptions())
      .pipe( 
        tap (
          data => console.log('getLastCode', data)
        )
      )
  }
}
