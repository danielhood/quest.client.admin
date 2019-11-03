import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { DeviceAudioModel } from '../models/audio.model';
import { DeviceTypeModel } from "../models/devicetype.model";
import { ResponseTypeModel } from "../models/responsetype.model";

@Injectable({
    providedIn: 'root',
})
export class AudioService {

    constructor(private http: HttpClient) { }

    buildDeviceAudioRequestOptions(): object {
        return {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*',
            })
        };
    }

    buildDeviceAudioUploadBody(deviceType: string, responseType: string, fileToUpload: File): FormData {
        // return {
        //     devicetype: deviceType,
        //     responsetype: responseType,
        //     filedata: fileToUpload
        // };
        const formData: FormData = new FormData();
        formData.append('filedata', fileToUpload);
        formData.append("devicetype", deviceType);
        formData.append("responsetype", responseType);
        return formData;
    }

    getDeviceAudio(): Observable<DeviceAudioModel> {
        return this.http.get<DeviceAudioModel>('https://quest.local:8443/device/audio', this.buildDeviceAudioRequestOptions())
            .pipe(tap(
                data => console.log('getDeviceAudio', data)
            )
            );
    }

    getDeviceTypes(): DeviceTypeModel[] {
        return [
            {key: "TREASURE:1", displayname: "TREASURE:1"},
            {key: "TREASURE:2", displayname: "TREASURE:2"},
            {key: "TREASURE:3", displayname: "TREASURE:3"},
            {key: "TREASURE:4", displayname: "TREASURE:4"},
            {key: "STAR:RED", displayname: "STAR:RED"},
            {key: "STAR:YELLOW", displayname: "STAR:YELLOW"},
            {key: "STAR:GREEN", displayname: "STAR:GREEN"},
            {key: "STAR:BLUE", displayname: "STAR:BLUE"}
        ];
    }

    getResponseTypes(): ResponseTypeModel[] {
        return [
            {key: "COMPLETED", displayname: "COMPLETED"},
            {key: "ITEM_NOT_PART_OF_QUEST", displayname: "ITEM_NOT_PART_OF_QUEST"},
            {key: "ITEM_COLLECTED_TOO_SOON", displayname: "ITEM_COLLECTED_TOO_SOON"},
            {key: "ITEM_ALREADY_COLLECTED", displayname: "ITEM_ALREADY_COLLECTED"},
            {key: "ACTIVATE", displayname: "ACTIVATE"},
            {key: "UNKNOWN_PLAYER", displayname: "UNKNOWN_PLAYER"},
            {key: "NO_QUEST", displayname: "NO_QUEST"},
            {key: "UNKNOWN_QUEST", displayname: "UNKNOWN_QUEST"}
        ];
    }

    updateDeviceAudio(deviceAudio: DeviceAudioModel): Observable<DeviceAudioModel> {
        return this.http.put<DeviceAudioModel>('https://quest.local:8443/device/audio', deviceAudio, this.buildDeviceAudioRequestOptions())
            .pipe(tap(
                data => console.log('updateDeviceAudio', data)
            )
            );
    }

    uploadAudio(deviceType: string, responseType: string, fileToUpload: File): Observable<string> {
        console.log("Uploading audio: ", deviceType, " - ", responseType, ": ", fileToUpload);

        return this.http.put<string>('https://quest.local:8443/device/audio', this.buildDeviceAudioUploadBody(deviceType, responseType, fileToUpload), this.buildDeviceAudioRequestOptions())
        //return this.http.put<string>('https://quest.local:8443/device/audio', fileToUpload, this.buildDeviceAudioRequestOptions())
            .pipe(tap(
                data => console.log('uploadAudio', data)
            ));
    }
}
