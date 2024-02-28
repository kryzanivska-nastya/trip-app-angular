import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

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
    {
      destination: 'Barcelona',
      startDate: '2024-04-03',
      endDate: '2024-04-10',
    },
  ];

  predefinedCities = ['Madrid', 'Barcelona', 'Paris', 'London'];

  selectedTrip: any;
  forecasts: any = {};
  filteredTrips: any[];
  todayForecast: any;
  countdownTimer: string = '';

  constructor(private dialog: MatDialog) {
    this.filteredTrips = this.trips.slice();
  }

  openAddTripModal() {
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      width: '400px',
      data: {
        cities: this.predefinedCities,
      },
    });

    dialogRef.componentInstance.tripAdded.subscribe((newTrip: any) => {
      this.trips.push(newTrip);
      this.filteredTrips = this.trips.slice();
    });
  }

  selectTrip(trip: any) {
    this.selectedTrip = trip;
    this.fetchForecast(trip.destination, trip.startDate, trip.endDate);
    this.fetchTodayForecast(trip.destination);
    this.calculateCountdown(trip.startDate);
  }

  fetchForecast(city: string, startDate: string, endDate: string) {
    const apiKey = '5JPNVGTXYQPBQ8YBGBNJJ2SYQ';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.forecasts[city] = data;
      })
      .catch((error) => {
        console.error('Error fetching forecast:', error);
      });
  }

  fetchTodayForecast(city: string) {
    const apiKey = '5JPNVGTXYQPBQ8YBGBNJJ2SYQ';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.todayForecast = data.days[0];
      })
      .catch((error) => {
        console.error("Error fetching today's forecast:", error);
      });
  }

  calculateCountdown(startDate: string) {
    const currentDate = new Date();
    const tripStartDate = new Date(startDate);
    const timeDifference = tripStartDate.getTime() - currentDate.getTime();

    let remainingTime = timeDifference / 1000;
    const days = Math.floor(remainingTime / (3600 * 24));
    remainingTime -= days * 3600 * 24;
    const hours = Math.floor(remainingTime / 3600);
    remainingTime -= hours * 3600;
    const minutes = Math.floor(remainingTime / 60);
    remainingTime -= minutes * 60;
    const seconds = Math.floor(remainingTime);

    this.countdownTimer = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }

  search(event: any) {
    const query =
      (event.target as HTMLInputElement)?.value.trim().toLowerCase() || '';
    this.filteredTrips = this.trips.filter((trip) =>
      trip.destination.toLowerCase().includes(query)
    );
  }
}
