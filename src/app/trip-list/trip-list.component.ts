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
  cities = ['Madrid', 'Paris', 'New York'];
  selectedCity: string | null = null;
  forecasts: any = {};

  selectCity(city: string) {
    this.selectedCity = city;
    if (!this.forecasts[city]) {
      this.fetchForecast(city);
    }
  }

  fetchForecast(city: string) {
    const apiKey = 'api_key';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

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
}
// export class TripListComponent {
//   trips = [
//     { destination: 'Madrid', startDate: '2024-03-05', endDate: '2024-03-10' },
//     { destination: 'Paris', startDate: '2024-03-12', endDate: '2024-03-17' },
//     { destination: 'Madrid', startDate: '2024-03-05', endDate: '2024-03-10' },
//     { destination: 'Paris', startDate: '2024-03-12', endDate: '2024-03-17' },
//     { destination: 'Madrid', startDate: '2024-03-05', endDate: '2024-03-10' },
//     { destination: 'Paris', startDate: '2024-03-12', endDate: '2024-03-17' },
//     // Add more trips as needed
//   ];
//   selectedTrip: any;
//   selectedIndex: number | null = null; // Initialize selected index
//   currentIndex = 0; // Initialize current index
//   numTripsToShow = 4; // Number of trips to display at once

//   selectTrip(index: number) {
//     this.selectedIndex = index;
//     this.selectedTrip = this.trips[index];
//   }

//   next() {
//     if (this.currentIndex < this.trips.length - this.numTripsToShow) {
//       this.currentIndex++;
//       if (
//         this.selectedIndex !== null &&
//         this.selectedIndex < this.currentIndex
//       ) {
//         this.selectedIndex = null; // Deselect if the selected trip is no longer visible
//       }
//     }
//   }

//   previous() {
//     if (this.currentIndex > 0) {
//       this.currentIndex--;
//       if (
//         this.selectedIndex !== null &&
//         this.selectedIndex >= this.currentIndex + this.numTripsToShow
//       ) {
//         this.selectedIndex = null; // Deselect if the selected trip is no longer visible
//       }
//     }
//   }

//   mouseSelect(index: number) {
//     this.selectTrip(index);
//   }
// }
