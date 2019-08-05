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
  token: Observable<TokenModel>;
  //token: TokenModel;

  constructor(
    private deviceService: DeviceService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices(): void {
    this.token = this.authService.getAuthToken('admin', 'admin');
      // .subscribe((data : TokenModel) => {
      //   this.token = data;
      //   console.log('token:', this.token.token)
      // });
      
    // this.token = this.authService.getAuthToken('admin', 'admin');

    // this.deviceService.getDevices()
    //     .subscribe(devices => this.devices = devices);
  }
}
