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
  deviceToken: string;

  constructor(
    private triggerService: TriggerService,
    private deviceService: DeviceService,
    private playerService: PlayerService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.getDevices();
  }

  getDeviceToken(hostname: string): void {
    this.authService.getDeviceToken(hostname)
      .subscribe((data : TokenModel) => {
        this.deviceToken = data.token;
        console.log('device-token:', this.deviceToken);
        localStorage.setItem('device-token', this.deviceToken);
      });
  }

  getDevices(): void {
    this.authService.getAuthToken('admin', 'admin')
      .subscribe((data : TokenModel) => {
        this.token = data.token;
        console.log('token:', this.token);
        localStorage.setItem('token', this.token);
      });

    this.getDeviceToken('device-test1')
    this.getDeviceToken('device-test2')
    this.getDeviceToken('device-test3')
    this.getDeviceToken('device-test4')
    this.getDeviceToken('device-test5')
    this.getDeviceToken('device-test6')
    this.getDeviceToken('device-test7')
    this.getDeviceToken('device-test8')
    
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

  onClearQuest(): void {
    console.log("Clear Player's Quest Data");

    this.playerService.getPlayer(12345678)
    .subscribe(
      player => {
        player.achievements = null
        player.queststatus = ""
        player.queststate = null
        this.playerService.updatePlayer(player)
        .subscribe()
      }
    );
  }

  initDevice(hostname: string, deviceType: string) {
    this.deviceService.getDevice(hostname)
      .subscribe(
        device => {
          device.devicetype = deviceType
          this.deviceService.updateDevice(device)
            .subscribe(
              res => this.getDevices()
            )
        }
      )    
  }

  onInitDeviceTypes(): void {
    this.initDevice('device-test1', 'TREASURE:1')
    this.initDevice('device-test2', 'TREASURE:2')
    this.initDevice('device-test3', 'TREASURE:3')
    this.initDevice('device-test4', 'TREASURE:4')
    this.initDevice('device-test5', 'STAR:RED')
    this.initDevice('device-test6', 'STAR:YELLOW')
    this.initDevice('device-test7', 'STAR:GREEN')
    this.initDevice('device-test8', 'STAR:BLUE')
  }
}
