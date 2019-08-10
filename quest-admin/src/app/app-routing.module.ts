import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceListComponent } from './devices/devices.component';
import { PlayerListComponent } from './players/players.component';
import { DeviceTestComponent } from './device.test/device.test.component';

const routes: Routes = [
  { path: 'devices', component: DeviceListComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'device-test', component: DeviceTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
