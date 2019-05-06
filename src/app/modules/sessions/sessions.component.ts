import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


export interface Session {
  _id: string;
  name: string;
  Created_date: Date;
}

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  public sessions: Array<Session>

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getAllSessions();
  }

  private getAllSessions(): void {
    this.route.data.subscribe(response => this.sessions = response.data);
  }
}
