import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedbacksComponent } from './feedbacks.component';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
const routes: Routes = [
  {
    path: ':id',
    component: FeedbacksComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: [FeedbacksComponent],
})
export class FeedbacksModule { }