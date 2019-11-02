import { Component, OnInit } from '@angular/core';

import { TokenModel } from "../models/token.model";
import { AuthService } from "../services/auth.service";
import { AudioService } from "../services/audio.service";
import { DeviceAudioModel } from "../models/audio.model";
import { DeviceTypeModel } from "../models/devicetype.model";
import { ResponseTypeModel } from "../models/responsetype.model";

@Component({
    selector: 'audiolist',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.less']
})
export class AudioComponent implements OnInit {
    deviceAudio: DeviceAudioModel;
    deviceTypes: DeviceTypeModel[];
    responseTypes: ResponseTypeModel[];
    token: string;

    constructor(
        private audioService: AudioService,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        //this.authenticate();
        this.getDeviceTypes();
        this.getResponseTypes();
        //this.getDeviceAudio();
    }

    authenticate(): void {
        this.authService.getAuthToken('admin', 'admin')
            .subscribe((data: TokenModel) => {
                this.token = data.token;
                console.log('token:', this.token);
                localStorage.setItem('token', this.token);
            });
    }

    getDeviceAudio(): void {
        this.audioService.getDeviceAudio()
            .subscribe(deviceAudio => this.deviceAudio = deviceAudio);
    }

    getDeviceTypes() {
        this.deviceTypes = this.audioService.getDeviceTypes();
    }

    getResponseTypes() {
        this.responseTypes = this.audioService.getResponseTypes();
    }
} 

class selectValue {
    id: string;
    name: string;
}