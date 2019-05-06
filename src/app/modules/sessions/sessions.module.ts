import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SessionsComponent } from './sessions.component';
import { SessionsResolver } from './sessions.resolver';
import { SessionResolver } from './session/session.resolver';
import { SessionComponent } from './session/session.component';
import { MatSelectModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: SessionsComponent,
    resolve: {
      data: SessionsResolver
    }
  },
  {
    path: 'session/:id',
    component: SessionComponent,
    resolve: {
      data: SessionResolver
    }
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: [SessionsComponent, SessionComponent],
  providers: [
    SessionsResolver
  ]
})
export class SessionsModule { }