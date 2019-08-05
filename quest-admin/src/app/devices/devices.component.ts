import { Component, OnInit } from '@angular/core';

import { DeviceModel } from "../models/device.model";
import { TokenModel } from "../models/token.model";
import { DeviceService } from "../services/device.service";
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.less']
})
export class DeviceListComponent  implements OnInit {
  devices: DeviceModel[];
  //token: Observable<TokenModel>;
  //token: TokenModel;
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
}
