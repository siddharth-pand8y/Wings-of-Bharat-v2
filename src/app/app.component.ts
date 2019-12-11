import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wings-of-bharat';
  birdSanctuarySelection = new FormControl('');
  showInfoBox: boolean;
  listState: boolean;
  sactuaryDetail = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.listState = true;
  }

  selectSanctuary() {
    this.showInfoBox = true;
    this.getSanctuaryDetails().subscribe((data) => {
      console.log(data);
    });
  }

  getSanctuaryDetails() {
    return this.http.get(environment.wikipeadiaAPI + this.birdSanctuarySelection.value);
  }


  collapseList() {
    this.listState = !this.listState;
  }

}