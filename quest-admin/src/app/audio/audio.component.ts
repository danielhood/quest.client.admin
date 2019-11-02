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

    selectedDeviceType: string = "";
    selectedResponseType: string = "";

    errorMessage: string;

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

    onDeviceTypeChanged(event: any){
        this.selectedDeviceType = event.target.value;
        console.log("deviceType changed: ", this.selectedDeviceType);
    }

    onResponseTypeChanged(event: any){
        this.selectedResponseType = event.target.value;
        console.log("responseType changed: ", this.selectedResponseType);
    }

    onUploadFile(event: any) {
        if (this.selectedDeviceType == "") {
            this.errorMessage = "Please select a device type.";
            return;
        }

        if (this.selectedResponseType == "") {
            this.errorMessage = "Please seleect a response type.";
            return;
        }

        this.audioService.uploadAudio(this.selectedDeviceType, this.selectedResponseType, event.target.files.item(0)).subscribe(data => {
                this.errorMessage = "Upload success";
            }, error => {
                console.log(error);
            });
    }
} 
