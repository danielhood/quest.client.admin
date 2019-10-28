import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { QuestModel } from '../models/quest.model';

@Injectable({
  providedIn: 'root',
})
export class QuestService {

  constructor(private http: HttpClient) { }

  buildQuestRequestOptions(): object {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
      })
    };
  }

  getQuests(): Observable<QuestModel[]> {
    return this.http.get<QuestModel[]>('https://quest.local:8443/quest', this.buildQuestRequestOptions())
        .pipe( tap (
          data => console.log('getQuests', data)
        )
      );
  }
}
