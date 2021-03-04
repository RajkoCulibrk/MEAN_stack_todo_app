import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ProviderService } from './provider.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  icon = faCoffee;
  constructor(private provider: ProviderService) {}
  ngOnInit() {
    this.provider.setUser();
    this.provider.getUser();
  }
}
