import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { ApiService } from './api.service';
import type { Aircraft } from './models/aircraft';
import type { FlightRoute } from './models/flightroute';
import { AircraftListComponent } from './lists/aircraft-list/aircraft-list';
import { FlightListComponent } from './lists/flight-list/flight-list';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    MatToolbarModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AircraftListComponent,
    FlightListComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [ApiService],
})
export class App {
  private readonly apiService = inject(ApiService);

  protected searchType: 'aircraft' | 'callsign' = 'aircraft';
  protected searchInput = '';
  protected readonly aircrafts = signal<Aircraft[]>([]);
  protected readonly flights = signal<FlightRoute[]>([]);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly fallbackImage = 'assets/6640187.jpg';

  search(): void {
    this.errorMessage.set(null);
    this.aircrafts.set([]);
    this.flights.set([]);

    const values = this.searchInput
      .split(',')
      .map((v) => v.trim())
      .filter((v) => !!v);

    if (!values.length) {
      this.errorMessage.set('Please enter at least one search value.');
      return;
    }

    this.loading.set(true);

    if (this.searchType === 'aircraft') {
      values.forEach((v) => {
        this.apiService
          .fetchAircraft(v)
          .pipe(finalize(() => this.loading.set(false)))
          .subscribe({
            next: (res) =>
              this.aircrafts.update((list) => [...list, res.response.aircraft]),
            error: (err) => {
              if (err.status === 404 && err.error?.response) {
                this.errorMessage.set(`Error: ${err.error.response}`);
              } else {
                this.errorMessage.set('An unexpected error occurred.');
              }
            },
          });
      });
    } else {
      values.forEach((v) => {
        this.apiService
          .fetchCallsign(v)
          .pipe(finalize(() => this.loading.set(false)))
          .subscribe({
            next: (res) =>
              this.flights.update((list) => [
                ...list,
                res.response.flightroute,
              ]),
            error: (err) => {
              if (err.status === 404 && err.error?.response) {
                this.errorMessage.set(`Error: ${err.error.response}`);
              } else {
                this.errorMessage.set('An unexpected error occurred.');
              }
            },
          });
      });
    }
  }
}
