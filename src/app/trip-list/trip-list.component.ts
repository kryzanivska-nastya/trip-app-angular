import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css',
})
export class TripListComponent {
  defaultCities = ['Madrid', 'Paris', 'New York'];

  trips = [
    { destination: 'Madrid', startDate: '2024-03-05', endDate: '2024-03-10' },
  ];

  selectedTrip: any;
  forecasts: any = {};
  filteredTrips: any[];
  todayForecast: any;
  countdownTimer: string = '';

  constructor() {
    this.filteredTrips = this.trips.slice();
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
        this.todayForecast = data;
      })
      .catch((error) => {
        console.error("Error fetching today's forecast:", error);
      });
  }

  calculateCountdown(startDate: string) {
    const currentDate = new Date();
    const tripStartDate = new Date(startDate);
    const timeDifference = tripStartDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    this.countdownTimer = `${daysDifference} days until the trip`;
  }

  search(event: any) {
    const query =
      (event.target as HTMLInputElement)?.value.trim().toLowerCase() || '';
    this.filteredTrips = this.trips.filter((trip) =>
      trip.destination.toLowerCase().includes(query)
    );
  }

  selectDefaultCity(city: string) {
    const startDate = '2024-03-05';
    const endDate = '2024-03-10';
    this.selectTrip({ destination: city, startDate, endDate });
  }
}
