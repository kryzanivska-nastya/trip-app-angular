import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
