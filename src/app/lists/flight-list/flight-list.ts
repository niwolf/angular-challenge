import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import type { FlightRoute } from '../../models/flightroute';

@Component({
  selector: 'app-flight-list',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './flight-list.html',
  styleUrls: ['./flight-list.scss'],
})
export class FlightListComponent {
  @Input() public flights: Array<FlightRoute> = [];
  @Input() public errorMessage: string | null = null;
}
