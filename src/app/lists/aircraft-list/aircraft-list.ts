import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import type { Aircraft } from '../../models/aircraft';

@Component({
  selector: 'app-aircraft-list',
  imports: [MatCardModule, MatGridListModule],
  templateUrl: './aircraft-list.html',
  styleUrls: ['./aircraft-list.scss'],
})
export class AircraftListComponent {
  @Input() public aircrafts: Array<Aircraft> = [];
  @Input() public errorMessage: string | null = null;
  @Input() public fallbackImage!: string;
}
