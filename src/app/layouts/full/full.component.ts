import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnDestroy,AfterViewInit} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['full.component.css']
})
export class FullComponent implements OnDestroy, AfterViewInit {

  
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {}

  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }

  customOptions: Array<any> = []

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'HOME',
        icon: 'uil uil-estate',
        router: ['https://www.micenfoc.com/']
      },
      {
        name: 'BIENVENIDOS',
        icon: 'uil uil-estate',
        router: ['https://www.micenfoc.com/ministry/']
      },
      {
        name: 'ALABANZAS',
        icon: 'uil uil-estate',
        router: ['/https://www.micenfoc.com/cenfoc-adoracion/']
      },
      {
        name: 'DONACIONES',
        icon: 'uil uil-estate',
        router: ['https://www.micenfoc.com/donaciones/']
      },
      {
        name: 'CONEXION',
        icon: 'uil uil-estate',
        router: ['https://grupos.micenfoc.com/groups']
      },
    ]

  }
  socialMediaLinks = [
    { name: 'Facebook', icon: 'fa fa-facebook-f', link: 'https://www.facebook.com/iglesiacenfoc/' },
    { name: 'Instagram', icon: 'fa fa-instagram', link: 'https://www.instagram.com/iglesiacenfoc/' },
    { name: 'YouTube', icon: 'fa fa-youtube', link: 'https://www.youtube.com/channel/UCUxrU6y9ADFipNjYq34LugQ' },
    { name: 'Correo', icon: 'fa fa-envelope', link: 'mailto:contacto@micenfoc.com' },
    { name: 'Login', icon: 'fa fa-user', link: 'https://admin.micenfoc.com' }
  ];

}


