import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
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
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
  providers: [ApiService]
})
export class FeedbacksComponent implements OnInit {
  public selectedOption: String;
  public feedbacks: Array<Feedback>;
  public customErrorMessage: String;
  public customSuccessMessage: String;
  public session: Array<Session>;
  public ratings: Rating[];
  public sessionId: string;
  public defaultOption:string;
  @ViewChild('comment') comment: ElementRef;

  constructor(
    private _apiService: ApiService,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {

    // define rating
    this.ratings = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' }
    ];

    // get current game sesssion infos
    this.sessionId = this.route.snapshot.paramMap.get('id');
    this._apiService.get('/sessions/' + this.sessionId).subscribe((response: Session[]) => {
      this.session = response;
    })
  }

  public selectRating(value): void {
    this.selectedOption = value;
  }

  public addFeedback(): void {
    this.customErrorMessage = '';
    this.customSuccessMessage = '';

    // validate that a rating is selected
    if (this.selectedOption) {

      // data to post
      let data = {
        rating: this.selectedOption,
        comment: this.comment.nativeElement.value,
        user: 15,
        sessionId: this.sessionId
      }

      this._apiService.post("/feedbacks", data).subscribe((response: any[]) => {
        if (typeof response === "string") {
          this.customErrorMessage = "You already left a feedback for this game."
        } else {
          // clear form fields
          this.comment.nativeElement.value = "";
          this.defaultOption = "all";
          
          this.customSuccessMessage = "Your feedback has been sent. Thank you."
        }
      })
    } else {
      this.customErrorMessage = "Please select a rating for this game session."
    }
  }
}
