import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PlayerModel } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  buildPlayerRequestOptions(): object {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
      })
    };
  }

  getPlayers(): Observable<PlayerModel[]> {
    return this.http.get<PlayerModel[]>('https://quest.local:8443/player', this.buildPlayerRequestOptions())
        .pipe( tap (
          data => console.log('getPlayers', data)
        )
      );
  }

  updatePlayer(device: PlayerModel): Observable<PlayerModel> {
    return this.http.put<PlayerModel>('https://quest.local:8443/player', device, this.buildPlayerRequestOptions())
      .pipe( tap (
        data => console.log('updatePlayer', data)
      )
    );
  }

}
