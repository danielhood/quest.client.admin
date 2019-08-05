import { Component, OnInit } from '@angular/core';

import { DeviceModel } from "../models/device.model";
import { DeviceService } from "../services/device.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.less']
})
export class DeviceListComponent  implements OnInit {
  devices: DeviceModel[];

  constructor(
    private deviceService: DeviceService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices(): void {
    this.authService.getAuthToken('admin', 'admin').subscribe();
    
    this.deviceService.getDevices()
        .subscribe(devices => this.devices = devices);
  }
}
