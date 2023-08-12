import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent {

  categoryId?: string | null;
  postForm: FormGroup; // Define el FormGroup si estás utilizando formularios reactivos

  constructor(private apiService: ApiService, private fb: FormBuilder, private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) {

    // Inicializa el formulario si estás utilizando formularios reactivos
    this.postForm = this.fb.group({
      // Define los campos y validaciones aquí
      // Ejemplo:
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.postForm.valid) {

      console.log(this.route.snapshot.paramMap.get('id'))
      
      const postData = {
        ...this.postForm.value,
        group_id: 14, 
        gender: 'NADA',
      };

      this.apiService.createPerson(postData).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
        },
        error => {
          console.error('Error en la solicitud:', error);
          // Maneja el error aquí, por ejemplo, mostrar un mensaje de error
        }
      );
    }
  }

  getGridCols(): number {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      return 1;
    }else if (this.breakpointObserver.isMatched('(min-width: 900px)') && this.breakpointObserver.isMatched('(max-width: 1500px)')) {
      return 3;
    }else {
      return 3;
    }

  }

}
