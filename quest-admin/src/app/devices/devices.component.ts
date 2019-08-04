import { Component, OnInit } from '@angular/core';

import { DeviceModel } from "../models/device.model";
import { DeviceService } from "../services/device.service"

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.less']
})
export class DeviceListComponent  implements OnInit {
  devices: DeviceModel[];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices(): void {
    this.deviceService.getDevices()
        .subscribe(devices => this.devices = devices);
  }
}
