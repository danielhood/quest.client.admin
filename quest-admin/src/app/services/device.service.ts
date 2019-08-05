import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { DeviceModel } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  token: string;

  constructor(private http: HttpClient) { }

  buildDeviceRequestOptions(): object {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
      })
    };
  }

  getDevices(): Observable<DeviceModel[]> {
    return this.http.get<DeviceModel[]>('https://quest.local:8443/device', this.buildDeviceRequestOptions())
        .pipe( tap (
          data => console.log(data)
        )
      );

    // return of([
    //     { hostname: 'host1', devicekey: 'star:red', isregistered: false, isenabled: false, devicetype: '' },
    //     { hostname: 'host2', devicekey: 'star:blue', isregistered: false, isenabled: false, devicetype: '' }
    // ]);
  }

  updateDevice(device: DeviceModel): Observable<DeviceModel> {
    return this.http.put<DeviceModel>('https://quest.local:8443/device', device, this.buildDeviceRequestOptions())
      .pipe( tap (
        data => console.log(data)
      )
    );
  }
}
