import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { GroupModule } from 'src/app/group-module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface Group {
  id: string;
  address: string;
  day: number;
  hour: string;
  leader: string;
  typeConnection: string;
}

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [GroupModule, NgFor, NgIf],
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit{

  // Arreglo con los nombres de los días de la semana
  categoryId?: string | null;
  details: Group[] = [];
  daysOfWeek = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.updateData()
  }

  updateData() {
    this.categoryId = this.route.snapshot.paramMap.get('id');

    if (this.categoryId) {
      this.apiService.getGroup(this.categoryId).subscribe(
        data => {
          this.details = [];
          for (let i = 0; i < data.length; i++) {
            const group: Group = { 
              id: data[i].id,
              leader: data[i].leader.name,
              address: data[i].address,
              day: data[i].day,
              hour: data[i].hour,
              typeConnection: data[i].typeConnection
            };
            this.details.push(group);
            console.log(data);
          }
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('No se encontró el categoryId en la ruta.');
    }
  };

  getGridCols(): number {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      return 1;
    }else if (this.breakpointObserver.isMatched('(min-width: 900px)') && this.breakpointObserver.isMatched('(max-width: 1500px)')) {
      return 1;
    }else {
      return 3;
    }

  }

}
