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
  trips: any[] = [
    {
      destination: 'Madrid',
      startDate: '2024-03-05',
      endDate: '2024-03-11',
      image: 'madrid1.png',
    },
  ];

  predefinedCities = ['Madrid', 'Barcelona', 'Paris', 'London'];

  selectedTrip: any;
  forecasts: any = {};
  filteredTrips: any[];
  todayForecast: any;
  countdownTimer: string = '';
  tripSelected: boolean = false;
  lastSelectedIndex: number = -1;

  constructor(private dialog: MatDialog) {
    this.filteredTrips = this.trips.slice();
    this.sortTripsByStartDate();
  }

  ngOnInit(): void {
    const storedTrips = localStorage.getItem('trips');
    if (storedTrips) {
      this.trips = JSON.parse(storedTrips);
      this.filteredTrips = this.trips.slice();
    }
  }

  openAddTripModal() {
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      width: '400px',
      data: {
        cities: this.predefinedCities,
      },
    });

    dialogRef.componentInstance.tripAdded.subscribe((newTrip: any) => {
      newTrip.image = `${newTrip.destination.toLowerCase()}.jpeg`;
      this.trips.push(newTrip);
      this.filteredTrips = this.trips.slice();
      this.sortTripsByStartDate();

      localStorage.setItem('trips', JSON.stringify(this.trips));
    });
  }

  selectTrip(trip: any, index: number) {
    this.selectedTrip = trip;
    this.tripSelected = true;
    this.fetchForecast(trip.destination, trip.startDate, trip.endDate);
    this.fetchTodayForecast(trip.destination);
    this.calculateCountdown(trip.startDate);
    this.lastSelectedIndex = index;
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
    this.sortTripsByStartDate();
  }

  private sortTripsByStartDate() {
    this.filteredTrips.sort((a, b) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    return dayOfWeek;
  }

  getWeatherEmoji(condition: string): string {
    switch (condition.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'partially cloudy':
        return '⛅';
      case 'rain':
        return '🌧️';
      case 'rain, overcast':
        return '🌧️';
      case 'overcast':
        return '☁️';
      default:
        return '☀️';
    }
  }

  getDynamicImageUrl(imageName: string): string {
    return `assets/${imageName}`;
  }
}
