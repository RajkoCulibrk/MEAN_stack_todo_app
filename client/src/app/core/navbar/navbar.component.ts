import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  faPen,
  faUserPlus,
  faSignOutAlt,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

import { filter } from 'rxjs/operators';
import { ProviderService } from 'src/app/provider.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentRoute: string;
  constructor(
    public provider: ProviderService,
    private location: Location,
    private router: Router
  ) {}
  faPen = faPen;
  faSignOutAlt = faSignOutAlt;
  faUserPlus = faUserPlus;
  faSignInAlt = faSignInAlt;
  url: string;

  ngOnInit(): void {
    /* this.router.events.subscribe((event) => {
      console.log(event);
    }); */
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  logout() {
    this.provider.logout();
  }
}
