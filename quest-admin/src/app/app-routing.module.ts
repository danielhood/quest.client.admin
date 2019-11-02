import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceListComponent } from './devices/devices.component';
import { PlayerListComponent } from './players/players.component';
import { QuestListComponent } from './quests/quests.component';
import { AudioComponent } from './audio/audio.component';
import { DeviceTestComponent } from './device.test/device.test.component';

const routes: Routes = [
  { path: 'devices', component: DeviceListComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'quests', component: QuestListComponent },
  { path: 'audio', component: AudioComponent },
  { path: 'device-test', component: DeviceTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
