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

  obtenerNumeroSemana(nombreDia: string): number | null {
    switch (nombreDia) {
      case 'Lunes':
        return 1;
      case 'Martes':
        return 2;
      case 'Miércoles':
        return 3;
      case 'Jueves':
        return 4;
      case 'Viernes':
        return 5;
      case 'Sábado':
        return 6;
      case 'Domingo':
        return 7;
      default:
        return null; // En caso de que el nombre del día no sea válido
    }
  }

  frequentlyAskedQuestions: Faq[] = [
    {
      category: 'Horarios',
      option: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00']

    },
    {
      category: 'Dias',
      option: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
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
      // Mapea los nombres de los días a sus números correspondientes
      const diasNumeros = this.selectedDiaOptions.map(dia => this.obtenerNumeroSemana(dia));
      
      // Filtra los posibles valores nulos y los convierte a cadena
      const diasFiltrados = diasNumeros.filter(dia => dia !== null).map(dia => dia!.toString());
      
      // Construye la parte de la URL utilizando los números de los días
      additionalUrl += `&filter[day]=${diasFiltrados.join(',')}`;
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

