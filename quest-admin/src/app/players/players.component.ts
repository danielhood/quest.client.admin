import { Component, OnInit } from '@angular/core';

import { TokenModel } from "../models/token.model";
import { AuthService } from "../services/auth.service";
import { PlayerModel } from "../models/player.model";
import { PlayerService } from "../services/player.service";

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.less']
})
export class PlayerListComponent  implements OnInit {
  players: PlayerModel[];
  token: string;

  constructor(
    private playerService: PlayerService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(): void {
    this.authService.getAuthToken('admin', 'admin')
      .subscribe((data : TokenModel) => {
        this.token = data.token;
        console.log('token:', this.token);
        localStorage.setItem('token', this.token);
      });
      
    this.playerService.getPlayers()
      .subscribe(players => this.players = players);
  }

  onEnableClick(player: PlayerModel): void {
    console.log('click');
    player.isenabled = !player.isenabled;
    this.playerService.updatePlayer(player)
      .subscribe();
  }

  onPlayerNameChanged(player: PlayerModel, event: any): void {
    console.log('Player Name changed:', event.target.value);
    player.name = event.target.value;
    this.playerService.updatePlayer(player)
      .subscribe();
  }

  onPlayerQuestKeyChanged(player: PlayerModel, event: any): void {
    console.log('Player QuestKey changed:', event.target.value);
    player.questkey = event.target.value;
    this.playerService.updatePlayer(player)
      .subscribe();
  }

  onAddPlayer(): void {
    console.log("Add Player");
    let player = new PlayerModel;
    player.name = "New Player";
    player.code = "0000";

    this.playerService.updatePlayer(player)
      .subscribe(
        players => this.players.push(player)  
      );
  }

  onDeletePlayer(player: PlayerModel): void {
    console.log("Delete Player:", player.name);
    this.playerService.deletePlayer(player)
      .subscribe(
        // Refetch all players
        data => this.playerService.getPlayers()
        .subscribe(players => this.players = players)
      );
  }
}
