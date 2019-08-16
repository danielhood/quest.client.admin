import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { DeviceModel } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

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
          data => console.log('getDevices', data)
        )
      );
  }

  getDevice(hostname: string): Observable<DeviceModel> {
    return this.http.get<DeviceModel>('https://quest.local:8443/device?hostname=' + hostname + '&key=testdevicekey', this.buildDeviceRequestOptions())
        .pipe( tap (
          data => console.log('getDevice', data)
        )
      );
  }

  updateDevice(device: DeviceModel): Observable<DeviceModel> {
    return this.http.put<DeviceModel>('https://quest.local:8443/device', device, this.buildDeviceRequestOptions())
      .pipe( tap (
        data => console.log('updateDeice', data)
      )
    );
  }
}
