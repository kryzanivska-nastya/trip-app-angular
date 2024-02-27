import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { TripService } from './trip.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers:[] ,
    imports: [CommonModule, RouterOutlet, TripListComponent, ModalWindowComponent, WeatherDisplayComponent, TripDetailsComponent]
})
export class AppComponent {
  title = 'trip-app-angular';
}
