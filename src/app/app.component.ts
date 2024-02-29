import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
  imports: [
    CommonModule,
    RouterOutlet,
    TripListComponent,
    ModalWindowComponent,
    HttpClientModule,
    FormsModule,
  ],
})
export class AppComponent {
  title = 'trip-app-angular';
}
