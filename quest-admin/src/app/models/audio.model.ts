export class DeviceAudioModel {
    devicetype: string;
    responseaudio: Array<ResponseAudioModel>;
}

export class ResponseAudioModel {
    responsekey: string;
    audioref: string;
}
