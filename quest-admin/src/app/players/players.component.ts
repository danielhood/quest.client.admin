import { Component, OnInit } from '@angular/core';

import { PlayerModel } from "../models/player.model";
import { PlayerService } from "../services/player.service";

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.less']
})
export class PlayerListComponent  implements OnInit {
  players: PlayerModel[];

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers()
        .subscribe(players => this.players = players);
  }
}
