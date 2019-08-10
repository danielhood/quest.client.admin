import { Component, OnInit } from '@angular/core';

import { DeviceModel } from "../models/device.model";
import { PlayerModel } from "../models/player.model";
import { TokenModel } from "../models/token.model";
import { DeviceService } from "../services/device.service";
import { PlayerService } from "../services/player.service";
import { TriggerService } from "../services/trigger.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'device-test',
  templateUrl: './device.test.component.html',
  styleUrls: ['./device.test.component.less']
})
export class DeviceTestComponent  implements OnInit {
  devices: DeviceModel[];
  token: string;

  constructor(
    private triggerService: TriggerService,
    private deviceService: DeviceService,
    private playerService: PlayerService,
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

    this.authService.getDeviceToken('device-test1')
      .subscribe((data : TokenModel) => {
        this.token = data.token;
        console.log('device token:', this.token);
        localStorage.setItem('device-token', this.token);
      });

    this.authService.getDeviceToken('device-test2')
      .subscribe((data : TokenModel) => {
        this.token = data.token;
        console.log('device token:', this.token);
        localStorage.setItem('device-token', this.token);
      });

    this.authService.getDeviceToken('device-test3')
    .subscribe((data : TokenModel) => {
      this.token = data.token;
      console.log('device token:', this.token);
      localStorage.setItem('device-token', this.token);
    });

    this.authService.getDeviceToken('device-test4')
      .subscribe((data : TokenModel) => {
        this.token = data.token;
        console.log('device token:', this.token);
        localStorage.setItem('device-token', this.token);
      });

    this.deviceService.getDevices()
      .subscribe(devices => this.devices = devices);
  }

  onTriggerClick(device: DeviceModel): void {
    console.log('trigger test device for player 123456789');
    this.playerService.getPlayer(12345678)
      .subscribe(
        player => this.triggerService.trigger(player.code, device.devicetype)
        .subscribe(
          triggerResponse => console.log('triggerResponse: ', triggerResponse)
        )
      );
  }
}
