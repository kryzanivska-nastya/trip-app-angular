import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css',
})
export class TripListComponent {
  trips = [
    { destination: 'Madrid', startDate: '2024-03-05', endDate: '2024-03-10' },
  ];
  selectedTrip: any;

  selectTrip(trip: any) {
    this.selectedTrip = trip;
  }
}
