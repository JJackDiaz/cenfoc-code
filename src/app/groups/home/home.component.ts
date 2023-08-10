import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { GroupModule } from 'src/app/group-module';
import { ApiService } from 'src/app/api.service';


interface Category {
  id: string;
  address: string;
  day: string;
  hour: string;
  leader: string;
  typeConnection: string;
}

interface Faq {
  category: string;
  option?: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GroupModule, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  frequentlyAskedQuestions: Faq[] = [
    {
      category: 'Horario',
      option: ['11:00', '12:00']
    },
    {
      category: 'Dia',
      option: ['1', '2', '3', '4', '5', '6', '7']
    },
  ];

  selectedHorarioOptions: string[] = [];
  selectedDiaOptions: string[] = [];
  categories: Category[] = [];

  // Función auxiliar para mapear valores numéricos de días a nombres de días de la semana
  mapDayToWeekday(day: string): string {
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const numericDay = parseInt(day, 10);
    if (numericDay >= 1 && numericDay <= 7) {
      return daysOfWeek[numericDay - 1];
    }
    return '';
  }

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.updateData();
  }

  onSelectHorarioOption(option: string) {
    if (this.isHorarioOptionSelected(option)) {
      this.selectedHorarioOptions = this.selectedHorarioOptions.filter(selectedOption => selectedOption !== option);
    } else {
      this.selectedHorarioOptions.push(option);
    }
    this.updateData();
  }

  onSelectDiaOption(option: string) {
    if (this.isDiaOptionSelected(option)) {
      this.selectedDiaOptions = this.selectedDiaOptions.filter(selectedOption => selectedOption !== option);
    } else {
      this.selectedDiaOptions.push(option);
    }
    this.updateData();
  }

  isHorarioOptionSelected(option: string): boolean {
    return this.selectedHorarioOptions.includes(option);
  }

  isDiaOptionSelected(option: string): boolean {
    return this.selectedDiaOptions.includes(option);
  }

  updateData() {
    
    let additionalUrl = '';
    if (this.selectedHorarioOptions.length > 0) {
      additionalUrl += `&filter[hour]=${this.selectedHorarioOptions.join(',')}`;
    }
    if (this.selectedDiaOptions.length > 0) {
      additionalUrl += `&filter[day]=${this.selectedDiaOptions.join(',')}`;
    }

    this.apiService.getGroups(additionalUrl).subscribe(
      data => {
        // Aquí puedes manipular los datos obtenidos de la API
        this.categories = [];
        for (let i = 0; i < data.length; i++) {
          const category: Category = { 
            id: data[i].id,
            leader: data[i].leader.name,
            address: data[i].address,
            day: this.mapDayToWeekday(data[i].day),
            hour: data[i].hour,
            typeConnection: data[i].typeConnection.name
          };
          this.categories.push(category);
          console.log(data[i]);
        }
      },
      error => {
        console.error(error);
      }
    );
  }


  selectedOptions: string[] = [];

  toggleOption(option: string) {
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter((item) => item !== option);
    } else {
      this.selectedOptions.push(option);
    }
  }

  getInitials(name: string): string {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
  }
  
  removeOption(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
    }
  }
}

