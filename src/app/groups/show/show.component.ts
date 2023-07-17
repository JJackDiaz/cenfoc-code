import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { GroupModule } from 'src/app/group-module';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [GroupModule, NgFor],
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

}
