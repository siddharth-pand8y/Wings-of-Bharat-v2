import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WikipediaService } from './core/wikipedia/wikipedia.service';

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

  constructor(private wikipediaService: WikipediaService) {
  }

  ngOnInit() {
    this.listState = true;
  }

  selectSanctuary() {
    this.showInfoBox = true;
    this.wikipediaService.getSanctuaryDetails(this.birdSanctuarySelection.value).subscribe((data) => {
      console.log(data);
    });
  }

  collapseList() {
    this.listState = !this.listState;
  }

}