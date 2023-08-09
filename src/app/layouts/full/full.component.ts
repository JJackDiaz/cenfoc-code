import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnDestroy,AfterViewInit} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Router } from '@angular/router';

/** @title Responsive sidenav */
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

  authMenu: {
    authOptions: Array<any>, accessLink: Array<any>
  } = { authOptions: [], accessLink: [] }

  customOptions: Array<any> = []

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'HOME',
        icon: 'uil uil-estate',
        router: ['/home']
      },
      {
        name: 'BIENVENIDOS',
        icon: 'uil uil-estate',
        router: ['https://www.micenfoc.com/ministry/']
      },
      {
        name: 'ALABANZAS',
        icon: 'uil uil-estate',
        router: ['/alabanzas']
      },
      {
        name: 'DONACIONES',
        icon: 'uil uil-estate',
        router: ['/donaciones']
      },
    ]

    this.authMenu.authOptions = [
      {
        name: 'Login',
        icon: 'person',
        router: ['/login']
      },
    ]

  }
}

