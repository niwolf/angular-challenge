import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { AircraftRespone } from './models/aircraft';
import type { FlightRouteResponse } from './models/flightroute';

@Injectable()
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://api.adsbdb.com/v0';

  public fetchAircraft(mode_s: string): Observable<AircraftRespone> {
    return this.http.get<AircraftRespone>(`${this.url}/aircraft/${mode_s}`);
  }

  public fetchCallsign(callsign: string): Observable<FlightRouteResponse> {
    return this.http.get<FlightRouteResponse>(
      `${this.url}/callsign/${callsign}`,
    );
  }
}
