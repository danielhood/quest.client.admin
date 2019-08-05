import { Component, OnInit } from '@angular/core';

import { DeviceModel } from "../models/device.model";
import { TokenModel } from "../models/token.model";
import { DeviceService } from "../services/device.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.less']
})
export class DeviceListComponent  implements OnInit {
  devices: DeviceModel[];
  token: string;

  constructor(
    private deviceService: DeviceService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices(): void {
    this.authService.getAuthToken('admin', 'admin')
      .subscribe((data : TokenModel) => {
        this.token = data.token;
        console.log('token:', this.token);
        localStorage.setItem('token', this.token);
      });
      
    this.deviceService.getDevices()
      .subscribe(devices => this.devices = devices);
  }

  onRegisterClick(device: DeviceModel): void {
    console.log('click');
    device.isregistered = !device.isregistered;
    this.deviceService.updateDevice(device)
      .subscribe();
  }

  onEnableClick(device: DeviceModel): void {
    console.log('click');
    device.isenabled = !device.isenabled;
    this.deviceService.updateDevice(device)
      .subscribe();
  }

  onDeviceTypeChanged(device: DeviceModel, event: any): void {
    console.log('DeviceType changed:', event.target.value);
    device.devicetype = event.target.value;
    this.deviceService.updateDevice(device)
      .subscribe();
  }
}
