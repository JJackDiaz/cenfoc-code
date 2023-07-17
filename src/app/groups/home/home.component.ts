import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { GroupModule } from 'src/app/group-module';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GroupModule, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
  selectedCategoriesArray: string[] = [];

  isCategorySelected(category: string): boolean {
    return this.selectedCategoriesArray.includes(category);
  }

  toggleCategory(category: string): void {
    const index = this.selectedCategoriesArray.indexOf(category);
    if (index >= 0) {
      this.selectedCategoriesArray.splice(index, 1);
    } else {
      this.selectedCategoriesArray.push(category);
    }
  }

  removeCategory(category: string): void {
    const index = this.selectedCategoriesArray.indexOf(category);
    if (index >= 0) {
      this.selectedCategoriesArray.splice(index, 1);
    }
  }
}
