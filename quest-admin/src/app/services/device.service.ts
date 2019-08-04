import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { DeviceModel } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  getDevices(): Observable<DeviceModel[]> {
    return of([
        { id: 11, name: 'star:red' },
        { id: 12, name: 'star:blue' }
    ]);
  }
}
