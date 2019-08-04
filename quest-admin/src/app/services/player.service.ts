import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { PlayerModel } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  getPlayers(): Observable<PlayerModel[]> {
    return of([
        { id: 11, name: 'player1' },
        { id: 12, name: 'player2' }
    ]);
  }
}
