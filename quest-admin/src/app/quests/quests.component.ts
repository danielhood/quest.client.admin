import { Component, OnInit } from '@angular/core';

import { TokenModel } from "../models/token.model";
import { AuthService } from "../services/auth.service";
import { QuestModel } from "../models/quest.model";
import { QuestService } from "../services/quest.service";

@Component({
  selector: 'quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.less']
})
export class QuestListComponent implements OnInit {
  quests: QuestModel[];
  token: string;

  constructor(
    private questService: QuestService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.getQuests();
  }

  getQuests(): void {
    this.authService.getAuthToken('admin', 'admin')
      .subscribe((data : TokenModel) => {
        this.token = data.token;
        console.log('token:', this.token);
        localStorage.setItem('token', this.token);
      });
      
    this.questService.getQuests()
      .subscribe(quests => this.quests = quests);
  }
}
