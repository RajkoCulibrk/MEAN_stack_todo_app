import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ProviderService } from './provider.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  icon = faCoffee;
  constructor(private provider: ProviderService, private titleService: Title) {}
  ngOnInit() {
    this.provider.setUser();
    this.provider.getUser();
    this.setTitle('Todo-List');
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
