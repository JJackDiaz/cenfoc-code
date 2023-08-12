import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { GroupModule } from 'src/app/groups/group-module';
import { ApiService } from 'src/app/api.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


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

  constructor(private apiService: ApiService, private breakpointObserver: BreakpointObserver) {}

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

  //Tamaños para col mobile
  getGridCols(): number {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      return 1;
    }else if (this.breakpointObserver.isMatched('(min-width: 900px)') && this.breakpointObserver.isMatched('(max-width: 1500px)')) {
      return 2;
    }else {
      return 3; // Muestra tres columnas en otras pantallas
    }

  }

  getHeight(): string {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      return '16:16';
    } else if (this.breakpointObserver.isMatched('(min-width: 900px)') && this.breakpointObserver.isMatched('(max-width: 1500px)')) {
      return '2:1';
    } else {
      return '5:4';
    }
  }
  
}

