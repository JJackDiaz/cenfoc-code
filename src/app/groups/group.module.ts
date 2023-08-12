import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

import { GroupRoutes } from './group.routing';

import { HomeComponent } from './home/home.component';
import { GroupModule } from './group-module';
import { ShowComponent } from './show/show.component';
import { JoinComponent } from './join/join.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GroupRoutes),
    GroupModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatChipsModule,

    HomeComponent,
    ShowComponent
  ],
  providers: [],
  declarations: [
    JoinComponent
  ],
})
export class GroupComponentsModule {}
