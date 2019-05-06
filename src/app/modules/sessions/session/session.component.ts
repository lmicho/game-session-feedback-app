import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

export interface Rating {
  value: string;
  label: string;
}

export interface Feedback {
  _id: string;
  rating: Number;
  comment: string,
  Created_date: Date,
  sessionId: string;
  user: Number;
}

export interface Session {
  _id: string;
  name: string;
  Created_date: Date;
}


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  providers: [ApiService]
})
export class SessionComponent implements OnInit {

  public defaultOption: string;
  public selectedOption: string;
  public noFeedbackMessage: string;
  public feedbacks: Array<Feedback>;
  public session: Array<Session>;
  public ratings: Rating[];
  public averageRating:Number;

  constructor(
    private route: ActivatedRoute,
    private _apiService: ApiService
  ) {
  }

  ngOnInit() {

    // define rating
    this.ratings = [
      { value: 'all', label: 'All' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' }
    ];

    // define default rating select option
    this.defaultOption = 'all'

    // get current game sesssion infos
    const id = this.route.snapshot.paramMap.get('id');
    this._apiService.get('/sessions/' + id).subscribe((response: Session[]) => {
      this.session = response;
    })

    this.getAllSessionFeedbacks();
  }

  public selectRating(value): void {
    // reset to all feedbacks
    this.getAllSessionFeedbacks();

    // set current rating option
    this.selectedOption = value;

    // filter feedback list with current rating option
    if (this.selectedOption != 'all') {
      this.feedbacks = this.feedbacks.filter(feedback => feedback.rating == value);
    }

    // no feedback messages
    const goodSession: string = "as epic as the last Avengers movie";
    const badSession: string = "boring as hell. We almost felt asleep";
    this.noFeedbackMessage = (Number(this.selectedOption) > 3) ? badSession : goodSession;
  }

  private getAllSessionFeedbacks(): void {
    this.route.data.subscribe(response => this.feedbacks = response.data);
    this.getAverageRating();
  }

  public getAverageRating(): void {
    const ratings = this.feedbacks.map(feedback => Number(feedback.rating))
    let sum, avg = 0;
    if (ratings.length) {
      sum = ratings.reduce(function (a, b) { return a + b; });
      avg = sum / ratings.length;
    }
    this.averageRating = Math.round(avg);
  }





}