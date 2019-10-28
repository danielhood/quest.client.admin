import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceListComponent } from './devices/devices.component';
import { PlayerListComponent } from './players/players.component';
import { QuestListComponent } from './quests/quests.component';
import { DeviceTestComponent } from './device.test/device.test.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceListComponent,
    PlayerListComponent,
    QuestListComponent,
    DeviceTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
