import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { GroupModule } from 'src/app/group-module';
import { ApiService } from 'src/app/api.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
  image?: Image;
  checked?: boolean;
}

interface Image {
  url: string;
  alt: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isLeaf: boolean;
  checked?: boolean;
}

interface Category {
  name: string;
  address: string;
  leader: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GroupModule, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  getInitials(name: string): string {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
  }
  
  treeControl: FlatTreeControl<ExampleFlatNode>;
  treeFlattener: MatTreeFlattener<FoodNode, ExampleFlatNode>;
  dataSource: MatTreeFlatDataSource<FoodNode, ExampleFlatNode>;
  
  categories: Category[] = [];

  ngOnInit() {
    this.apiService.getGroups().subscribe(
      data => {
        // Aquí puedes manipular los datos obtenidos de la API
        for (let i = 0; i < data.length; i++) {
          const category: Category = { name: data[i].id , address: data[i].address,  leader: data[i].leader_id};
          this.categories.push(category);
          console.log(category)
        }

      },
      error => {
        console.error(error);
      }
    );
  }

  selectedImage: Image | undefined;

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level,
      node => node.expandable
    );

    this.treeFlattener = new MatTreeFlattener<FoodNode, ExampleFlatNode>(
      (node: FoodNode, level: number) => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level: level,
        isLeaf: !node.children || node.children.length === 0,
        checked: node.checked || false
      }),
      node => node.level,
      node => node.expandable,
      node => node.children
    );

    this.dataSource = new MatTreeFlatDataSource<FoodNode, ExampleFlatNode>(
      this.treeControl,
      this.treeFlattener
    );

    this.dataSource.data = TREE_DATA;
  }

  onSelectionChange(event: any): void {
    if (event.option.selected && !this.treeControl.isExpanded(event.option.value)) {
      this.treeControl.toggle(event.option.value);
    }
  }

  toggleSelection(node: ExampleFlatNode): void {
    node.checked = !node.checked;
    this.treeControl.expand(node);
  }

  searchImage(name: string): void {
    // Realizar solicitud HTTP para obtener la imagen correspondiente
    this.getImageFromAPI(name).subscribe((image: Image) => {
      this.selectedImage = image;
    });
  }

  getImageFromAPI(name: string): Observable<Image> {
    const images = [
      { url: 'https://example.com/image1.jpg', alt: 'Image 1' },
      { url: 'https://example.com/image2.jpg', alt: 'Image 2' },
      { url: 'https://example.com/image3.jpg', alt: 'Image 3' },
      { url: 'https://example.com/image4.jpg', alt: 'Image 4' },
      { url: 'https://example.com/image5.jpg', alt: 'Image 5' }
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    return of(randomImage);
  }

  hasChild(_: number, node: ExampleFlatNode): boolean {
    return node.expandable;
  }

  isLeaf(_: number, node: ExampleFlatNode): boolean {
    return node.isLeaf;
  }
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Categoría 1',
    children: [
      { name: 'Subcategoría 1.1' },
      { name: 'Subcategoría 1.2' }
    ]
  },
  {
    name: 'Categoría 2',
    children: [
      { name: 'Subcategoría 2.1' },
      { name: 'Subcategoría 2.2' }
    ]
  }
];
