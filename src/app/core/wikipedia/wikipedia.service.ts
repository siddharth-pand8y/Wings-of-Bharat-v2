import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private http: HttpClient) { }

  getSanctuaryDetails(birdSanctuarySelection) {
    return this.http.get(environment.wikipeadiaAPI + birdSanctuarySelection);
  }
}
